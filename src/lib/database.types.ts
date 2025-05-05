export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      schools: {
        Row: {
          id: string
          created_at: string
          name: string
          address: string
          phone: string
          email: string
          logo_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          address: string
          phone: string
          email: string
          logo_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          address?: string
          phone?: string
          email?: string
          logo_url?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string
          role: 'super_admin' | 'school_admin' | 'teacher' | 'parent' | 'student'
          school_id: string | null
          avatar_url: string | null
          phone: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          full_name: string
          role: 'super_admin' | 'school_admin' | 'teacher' | 'parent' | 'student'
          school_id?: string | null
          avatar_url?: string | null
          phone?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          full_name?: string
          role?: 'super_admin' | 'school_admin' | 'teacher' | 'parent' | 'student'
          school_id?: string | null
          avatar_url?: string | null
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_school_id_fkey"
            columns: ["school_id"]
            referencedRelation: "schools"
            referencedColumns: ["id"]
          }
        ]
      }
      students: {
        Row: {
          id: string
          created_at: string
          admission_id: string
          school_id: string
          full_name: string
          date_of_birth: string
          gender: 'male' | 'female' | 'other'
          blood_group: string | null
          address: string
          contact_email: string | null
          contact_phone: string | null
          admission_date: string
          current_class_id: string | null
          current_section_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          admission_id: string
          school_id: string
          full_name: string
          date_of_birth: string
          gender: 'male' | 'female' | 'other'
          blood_group?: string | null
          address: string
          contact_email?: string | null
          contact_phone?: string | null
          admission_date: string
          current_class_id?: string | null
          current_section_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          admission_id?: string
          school_id?: string
          full_name?: string
          date_of_birth?: string
          gender?: 'male' | 'female' | 'other'
          blood_group?: string | null
          address?: string
          contact_email?: string | null
          contact_phone?: string | null
          admission_date?: string
          current_class_id?: string | null
          current_section_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_school_id_fkey"
            columns: ["school_id"]
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_current_class_id_fkey"
            columns: ["current_class_id"]
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_current_section_id_fkey"
            columns: ["current_section_id"]
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      classes: {
        Row: {
          id: string
          created_at: string
          name: string
          school_id: string
          academic_year: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          school_id: string
          academic_year: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          school_id?: string
          academic_year?: string
        }
        Relationships: [
          {
            foreignKeyName: "classes_school_id_fkey"
            columns: ["school_id"]
            referencedRelation: "schools"
            referencedColumns: ["id"]
          }
        ]
      }
      sections: {
        Row: {
          id: string
          created_at: string
          name: string
          class_id: string
          teacher_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          class_id: string
          teacher_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          class_id?: string
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sections_class_id_fkey"
            columns: ["class_id"]
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_teacher_id_fkey"
            columns: ["teacher_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      subjects: {
        Row: {
          id: string
          created_at: string
          name: string
          school_id: string
          subject_code: string
          subject_type: 'core' | 'elective'
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          school_id: string
          subject_code: string
          subject_type: 'core' | 'elective'
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          school_id?: string
          subject_code?: string
          subject_type?: 'core' | 'elective'
        }
        Relationships: [
          {
            foreignKeyName: "subjects_school_id_fkey"
            columns: ["school_id"]
            referencedRelation: "schools"
            referencedColumns: ["id"]
          }
        ]
      }
      teacher_subjects: {
        Row: {
          id: string
          created_at: string
          teacher_id: string
          subject_id: string
          class_id: string
          section_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          teacher_id: string
          subject_id: string
          class_id: string
          section_id: string
        }
        Update: {
          id?: string
          created_at?: string
          teacher_id?: string
          subject_id?: string
          class_id?: string
          section_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_subjects_teacher_id_fkey"
            columns: ["teacher_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_subjects_subject_id_fkey"
            columns: ["subject_id"]
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_subjects_class_id_fkey"
            columns: ["class_id"]
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_subjects_section_id_fkey"
            columns: ["section_id"]
            referencedRelation: "sections"
            referencedColumns: ["id"]
          }
        ]
      }
      attendance: {
        Row: {
          id: string
          created_at: string
          date: string
          student_id: string
          class_id: string
          section_id: string
          status: 'present' | 'absent' | 'late'
          marked_by: string
        }
        Insert: {
          id?: string
          created_at?: string
          date: string
          student_id: string
          class_id: string
          section_id: string
          status: 'present' | 'absent' | 'late'
          marked_by: string
        }
        Update: {
          id?: string
          created_at?: string
          date?: string
          student_id?: string
          class_id?: string
          section_id?: string
          status?: 'present' | 'absent' | 'late'
          marked_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_class_id_fkey"
            columns: ["class_id"]
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_section_id_fkey"
            columns: ["section_id"]
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_marked_by_fkey"
            columns: ["marked_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      assessments: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string | null
          class_id: string
          section_id: string
          subject_id: string
          max_marks: number
          assessment_date: string
          assessment_type: 'quiz' | 'assignment' | 'mid_term' | 'final'
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description?: string | null
          class_id: string
          section_id: string
          subject_id: string
          max_marks: number
          assessment_date: string
          assessment_type: 'quiz' | 'assignment' | 'mid_term' | 'final'
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string | null
          class_id?: string
          section_id?: string
          subject_id?: string
          max_marks?: number
          assessment_date?: string
          assessment_type?: 'quiz' | 'assignment' | 'mid_term' | 'final'
        }
        Relationships: [
          {
            foreignKeyName: "assessments_class_id_fkey"
            columns: ["class_id"]
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessments_section_id_fkey"
            columns: ["section_id"]
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessments_subject_id_fkey"
            columns: ["subject_id"]
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          }
        ]
      }
      assessment_marks: {
        Row: {
          id: string
          created_at: string
          assessment_id: string
          student_id: string
          marks_obtained: number
          remarks: string | null
          recorded_by: string
        }
        Insert: {
          id?: string
          created_at?: string
          assessment_id: string
          student_id: string
          marks_obtained: number
          remarks?: string | null
          recorded_by: string
        }
        Update: {
          id?: string
          created_at?: string
          assessment_id?: string
          student_id?: string
          marks_obtained?: number
          remarks?: string | null
          recorded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_marks_assessment_id_fkey"
            columns: ["assessment_id"]
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_marks_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_marks_recorded_by_fkey"
            columns: ["recorded_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      fees: {
        Row: {
          id: string
          created_at: string
          school_id: string
          fee_type: string
          amount: number
          class_id: string | null
          academic_year: string
          due_date: string
        }
        Insert: {
          id?: string
          created_at?: string
          school_id: string
          fee_type: string
          amount: number
          class_id?: string | null
          academic_year: string
          due_date: string
        }
        Update: {
          id?: string
          created_at?: string
          school_id?: string
          fee_type?: string
          amount?: number
          class_id?: string | null
          academic_year?: string
          due_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "fees_school_id_fkey"
            columns: ["school_id"]
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fees_class_id_fkey"
            columns: ["class_id"]
            referencedRelation: "classes"
            referencedColumns: ["id"]
          }
        ]
      }
      fee_payments: {
        Row: {
          id: string
          created_at: string
          student_id: string
          fee_id: string
          amount_paid: number
          payment_date: string
          payment_method: string
          receipt_number: string
          recorded_by: string
        }
        Insert: {
          id?: string
          created_at?: string
          student_id: string
          fee_id: string
          amount_paid: number
          payment_date: string
          payment_method: string
          receipt_number: string
          recorded_by: string
        }
        Update: {
          id?: string
          created_at?: string
          student_id?: string
          fee_id?: string
          amount_paid?: number
          payment_date?: string
          payment_method?: string
          receipt_number?: string
          recorded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "fee_payments_student_id_fkey"
            columns: ["student_id"]
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fee_payments_fee_id_fkey"
            columns: ["fee_id"]
            referencedRelation: "fees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fee_payments_recorded_by_fkey"
            columns: ["recorded_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          id: string
          created_at: string
          school_id: string
          title: string
          content: string
          notification_type: 'announcement' | 'newsletter' | 'reminder'
          target_audience: 'all' | 'teachers' | 'parents' | 'students'
          sent_by: string
        }
        Insert: {
          id?: string
          created_at?: string
          school_id: string
          title: string
          content: string
          notification_type: 'announcement' | 'newsletter' | 'reminder'
          target_audience: 'all' | 'teachers' | 'parents' | 'students'
          sent_by: string
        }
        Update: {
          id?: string
          created_at?: string
          school_id?: string
          title?: string
          content?: string
          notification_type?: 'announcement' | 'newsletter' | 'reminder'
          target_audience?: 'all' | 'teachers' | 'parents' | 'students'
          sent_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_school_id_fkey"
            columns: ["school_id"]
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_sent_by_fkey"
            columns: ["sent_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}