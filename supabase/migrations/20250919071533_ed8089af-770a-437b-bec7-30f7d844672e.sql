-- Set the first user as admin for testing purposes
-- This allows immediate access to the admin panel

UPDATE public.profiles 
SET role = 'admin' 
WHERE user_id = (
  SELECT user_id 
  FROM public.profiles 
  ORDER BY created_at 
  LIMIT 1
);