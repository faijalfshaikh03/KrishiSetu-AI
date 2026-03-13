import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { RealtimeChannel } from '@supabase/supabase-js'

export function useRealtimeData<T>(
  table: string,
  filter?: { column: string; value: any }
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let channel: RealtimeChannel

    const fetchData = async () => {
      try {
        setLoading(true)
        let query = supabase.from(table).select('*')
        
        if (filter) {
          query = query.eq(filter.column, filter.value)
        }

        const { data: fetchedData, error: fetchError } = await query

        if (fetchError) throw fetchError
        setData(fetchedData || [])
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    const setupRealtimeSubscription = () => {
      channel = supabase
        .channel(`${table}-changes`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: table,
            filter: filter ? `${filter.column}=eq.${filter.value}` : undefined,
          },
          (payload) => {
            if (payload.eventType === 'INSERT') {
              setData((current) => [...current, payload.new as T])
            } else if (payload.eventType === 'UPDATE') {
              setData((current) =>
                current.map((item: any) =>
                  item.id === payload.new.id ? (payload.new as T) : item
                )
              )
            } else if (payload.eventType === 'DELETE') {
              setData((current) =>
                current.filter((item: any) => item.id !== payload.old.id)
              )
            }
          }
        )
        .subscribe()
    }

    fetchData()
    setupRealtimeSubscription()

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [table, filter?.column, filter?.value])

  return { data, loading, error, setData }
}
