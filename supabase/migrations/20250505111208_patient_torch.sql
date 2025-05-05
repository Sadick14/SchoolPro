/*
  # Initial Schema Setup
  
  1. Tables Created
    - schools
    - users
    - classes
    - sections
    - students
    - subjects
    - teacher_subjects
    - attendance
    - assessments
    - assessment_marks
    - fees
    - fee_payments
    - notifications
    - parent_student_relationship
  
  2. Security
    - Enable RLS on all tables
    - Add policies for each role type
    - Implement row-level security for data access
*/

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  address text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  logo_url text
);

-- Create classes table first since it's referenced by other tables
CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  school_id uuid NOT NULL REFERENCES schools(id),
  academic_year text NOT NULL
);

-- Create sections table after classes
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  class_id uuid NOT NULL REFERENCES classes(id),
  teacher_id uuid -- Will be altered to add REFERENCES after users table is created
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users,
  created_at timestamptz DEFAULT now(),
  email text NOT NULL UNIQUE,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('super_admin', 'school_admin', 'teacher', 'parent', 'student')),
  school_id uuid REFERENCES schools(id),
  avatar_url text,
  phone text
);

-- Add foreign key for sections.teacher_id now that users table exists
ALTER TABLE sections
ADD CONSTRAINT sections_teacher_id_fkey
FOREIGN KEY (teacher_id) REFERENCES users(id);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  admission_id text NOT NULL,
  school_id uuid NOT NULL REFERENCES schools(id),
  full_name text NOT NULL,
  date_of_birth date NOT NULL,
  gender text NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  blood_group text,
  address text NOT NULL,
  contact_email text,
  contact_phone text,
  admission_date date NOT NULL,
  current_class_id uuid REFERENCES classes(id),
  current_section_id uuid REFERENCES sections(id),
  user_id uuid REFERENCES users(id)
);

-- Create subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  school_id uuid NOT NULL REFERENCES schools(id),
  subject_code text NOT NULL,
  subject_type text NOT NULL CHECK (subject_type IN ('core', 'elective'))
);

-- Create teacher_subjects table
CREATE TABLE IF NOT EXISTS teacher_subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  teacher_id uuid NOT NULL REFERENCES users(id),
  subject_id uuid NOT NULL REFERENCES subjects(id),
  class_id uuid NOT NULL REFERENCES classes(id),
  section_id uuid NOT NULL REFERENCES sections(id)
);

-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  date date NOT NULL,
  student_id uuid NOT NULL REFERENCES students(id),
  class_id uuid NOT NULL REFERENCES classes(id),
  section_id uuid NOT NULL REFERENCES sections(id),
  status text NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  marked_by uuid NOT NULL REFERENCES users(id)
);

-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text,
  class_id uuid NOT NULL REFERENCES classes(id),
  section_id uuid NOT NULL REFERENCES sections(id),
  subject_id uuid NOT NULL REFERENCES subjects(id),
  max_marks integer NOT NULL,
  assessment_date date NOT NULL,
  assessment_type text NOT NULL CHECK (assessment_type IN ('quiz', 'assignment', 'mid_term', 'final'))
);

-- Create assessment_marks table
CREATE TABLE IF NOT EXISTS assessment_marks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  assessment_id uuid NOT NULL REFERENCES assessments(id),
  student_id uuid NOT NULL REFERENCES students(id),
  marks_obtained integer NOT NULL CHECK (marks_obtained >= 0),
  remarks text,
  recorded_by uuid NOT NULL REFERENCES users(id)
);

-- Create fees table
CREATE TABLE IF NOT EXISTS fees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  school_id uuid NOT NULL REFERENCES schools(id),
  fee_type text NOT NULL,
  amount numeric NOT NULL CHECK (amount >= 0),
  class_id uuid REFERENCES classes(id),
  academic_year text NOT NULL,
  due_date date NOT NULL
);

-- Create fee_payments table
CREATE TABLE IF NOT EXISTS fee_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  student_id uuid NOT NULL REFERENCES students(id),
  fee_id uuid NOT NULL REFERENCES fees(id),
  amount_paid numeric NOT NULL CHECK (amount_paid >= 0),
  payment_date date NOT NULL,
  payment_method text NOT NULL,
  receipt_number text NOT NULL,
  recorded_by uuid NOT NULL REFERENCES users(id)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  school_id uuid NOT NULL REFERENCES schools(id),
  title text NOT NULL,
  content text NOT NULL,
  notification_type text NOT NULL CHECK (notification_type IN ('announcement', 'newsletter', 'reminder')),
  target_audience text NOT NULL CHECK (target_audience IN ('all', 'teachers', 'parents', 'students')),
  sent_by uuid NOT NULL REFERENCES users(id)
);

-- Create parent_student_relationship table
CREATE TABLE IF NOT EXISTS parent_student_relationship (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  parent_id uuid NOT NULL REFERENCES users(id),
  student_id uuid NOT NULL REFERENCES students(id),
  relationship text NOT NULL
);

-- Enable Row Level Security on all tables
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_student_relationship ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Super admin can access everything
CREATE POLICY "Super admin can access all schools" ON schools
  FOR ALL TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'super_admin'));

-- School admin or teacher can access their own school
CREATE POLICY "Users can access their own school" ON schools
  FOR SELECT TO authenticated
  USING (id IN (SELECT school_id FROM users WHERE id = auth.uid()));

-- Users policies
CREATE POLICY "Super admin can manage all users" ON users
  FOR ALL TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'super_admin'));

CREATE POLICY "School admin can manage users in their school" ON users
  FOR ALL TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'school_admin') AND
    school_id IN (SELECT school_id FROM users WHERE id = auth.uid())
  );

CREATE POLICY "Users can view their own record" ON users
  FOR SELECT TO authenticated
  USING (id = auth.uid());

-- Students policies
CREATE POLICY "Super admin and school admin can manage all students" ON students
  FOR ALL TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM users 
      WHERE role IN ('super_admin', 'school_admin')
    )
  );

CREATE POLICY "Teachers can view students in their classes" ON students
  FOR SELECT TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'teacher') AND
    current_class_id IN (
      SELECT class_id FROM sections 
      WHERE teacher_id = auth.uid()
      UNION
      SELECT class_id FROM teacher_subjects 
      WHERE teacher_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view their children" ON students
  FOR SELECT TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'parent') AND
    id IN (
      SELECT student_id FROM parent_student_relationship 
      WHERE parent_id = auth.uid()
    )
  );

CREATE POLICY "Students can view their own record" ON students
  FOR SELECT TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'student') AND
    user_id = auth.uid()
  );

-- Attendance policies
CREATE POLICY "Super admin and school admin can manage all attendance" ON attendance
  FOR ALL TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM users 
      WHERE role IN ('super_admin', 'school_admin')
    )
  );

CREATE POLICY "Class teachers can manage attendance for their class" ON attendance
  FOR ALL TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'teacher') AND
    section_id IN (
      SELECT id FROM sections 
      WHERE teacher_id = auth.uid()
    )
  );

CREATE POLICY "Subject teachers can view attendance" ON attendance
  FOR SELECT TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'teacher') AND
    class_id IN (
      SELECT class_id FROM teacher_subjects 
      WHERE teacher_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view their children's attendance" ON attendance
  FOR SELECT TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'parent') AND
    student_id IN (
      SELECT student_id FROM parent_student_relationship 
      WHERE parent_id = auth.uid()
    )
  );

CREATE POLICY "Students can view their own attendance" ON attendance
  FOR SELECT TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'student') AND
    student_id IN (
      SELECT id FROM students 
      WHERE user_id = auth.uid()
    )
  );

-- Assessment policies
CREATE POLICY "Super admin and school admin can manage all assessments" ON assessments
  FOR ALL TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM users 
      WHERE role IN ('super_admin', 'school_admin')
    )
  );

CREATE POLICY "Teachers can manage assessments for their subjects" ON assessments
  FOR ALL TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'teacher') AND
    (class_id, section_id, subject_id) IN (
      SELECT class_id, section_id, subject_id FROM teacher_subjects 
      WHERE teacher_id = auth.uid()
    )
  );

CREATE POLICY "Parents and students can view assessments" ON assessments
  FOR SELECT TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM users WHERE role IN ('parent', 'student'))
  );

-- Assessment marks policies
CREATE POLICY "Super admin and school admin can manage all assessment marks" ON assessment_marks
  FOR ALL TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM users 
      WHERE role IN ('super_admin', 'school_admin')
    )
  );

CREATE POLICY "Teachers can manage marks for their subjects" ON assessment_marks
  FOR ALL TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'teacher') AND
    assessment_id IN (
      SELECT a.id FROM assessments a
      JOIN teacher_subjects ts ON 
        a.class_id = ts.class_id AND 
        a.section_id = ts.section_id AND 
        a.subject_id = ts.subject_id
      WHERE ts.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view their children's marks" ON assessment_marks
  FOR SELECT TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'parent') AND
    student_id IN (
      SELECT student_id FROM parent_student_relationship 
      WHERE parent_id = auth.uid()
    )
  );

CREATE POLICY "Students can view their own marks" ON assessment_marks
  FOR SELECT TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'student') AND
    student_id IN (
      SELECT id FROM students 
      WHERE user_id = auth.uid()
    )
  );

-- Parent-student relationship policies
CREATE POLICY "Super admin and school admin can manage parent-student relationships" ON parent_student_relationship
  FOR ALL TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM users 
      WHERE role IN ('super_admin', 'school_admin')
    )
  );

CREATE POLICY "Parents can view their relationships" ON parent_student_relationship
  FOR SELECT TO authenticated
  USING (
    parent_id = auth.uid()
  );