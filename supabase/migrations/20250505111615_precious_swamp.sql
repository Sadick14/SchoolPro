/*
  # Create Super Admin User
  
  Creates the initial super admin user for system access
*/

-- Insert super admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'fd3d4c8e-9f9d-4f31-8c08-278dec571f8c',
  'authenticated',
  'authenticated',
  'admin@school.com',
  crypt('Admin123!', gen_salt('bf')),
  now(),
  now(),
  now()
);

-- Insert user profile
INSERT INTO public.users (
  id,
  email,
  full_name,
  role
) VALUES (
  'fd3d4c8e-9f9d-4f31-8c08-278dec571f8c',
  'admin@school.com',
  'System Administrator',
  'super_admin'
);