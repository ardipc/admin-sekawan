import moment from "moment";

export async function uploadFileToStorage(supabase: any, gambar: any) {
  const rename = gambar.name.toString().replaceAll(" ", "_").replace(/[^a-zA-Z0-9.]/g, '');
  const filename = `${process.env.NEXT_PUBLIC_SUPABASE_ENV}/${moment().format('yyyy-MM-DD')}/${moment().format('yyyyMMDDHHmmss')}-${rename}`;
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET as string)
    .upload(filename, gambar, {
      cacheControl: "3600",
      upsert: false,
    });
  const filepath = data?.path;
  return error ? '' : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}/${filepath}`;
}

export async function deleteFileOnStorage(supabase: any, fullpath: string) {
  const removePrefix = fullpath.replace(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_BUCKET as string}/`, '');
  const {_, error} = await supabase.storage.from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET as string).remove([removePrefix]);
  return error ? false : true;
}