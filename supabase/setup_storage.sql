-- Create the magnat-media bucket
insert into storage.buckets (id, name, public) 
values ('magnat-media', 'magnat-media', true);

-- Allow public read access
create policy "Public Access" 
on storage.objects for select 
using ( bucket_id = 'magnat-media' );

-- Allow authenticated admins to upload/modify
create policy "Auth Admin Upload/Modify/Delete" 
on storage.objects for all 
using ( bucket_id = 'magnat-media' and auth.role() = 'authenticated' );
