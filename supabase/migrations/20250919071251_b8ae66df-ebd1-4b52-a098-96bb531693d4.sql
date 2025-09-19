-- Fix critical security vulnerabilities

-- 1. Add role column to profiles table for role-based access control
ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'user';

-- 2. Create security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- 3. Drop the overly permissive "Profiles are viewable by everyone" policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- 4. Create more restrictive profile viewing policy
-- Users can only view their own basic profile info (name only, not sensitive data)
CREATE POLICY "Users can view basic profile info" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- 5. Create admin policy for profiles (admins can view all profiles)
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.get_current_user_role() = 'admin');

-- 6. Update the handle_new_user function to set default role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name', 'user');
  RETURN NEW;
END;
$$;

-- 7. Add trigger for new users if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') THEN
        CREATE TRIGGER on_auth_user_created
          AFTER INSERT ON auth.users
          FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    END IF;
END $$;