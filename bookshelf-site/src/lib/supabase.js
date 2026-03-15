import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://nauxxwrkbpdmctgemsqx.supabase.co"
const supabaseKey = "sb_publishable_XR-W20CtWmoqaUlOhNPK2w_UpEizGw1"

export const supabase = createClient(supabaseUrl, supabaseKey)