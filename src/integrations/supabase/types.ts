export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      gallery_categories: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          caption: string | null
          category_id: string | null
          created_at: string
          id: string
          image_url: string
          is_active: boolean
          is_featured: boolean
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          caption?: string | null
          category_id?: string | null
          created_at?: string
          id?: string
          image_url: string
          is_active?: boolean
          is_featured?: boolean
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          caption?: string | null
          category_id?: string | null
          created_at?: string
          id?: string
          image_url?: string
          is_active?: boolean
          is_featured?: boolean
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "gallery_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiries: {
        Row: {
          address: string | null
          created_at: string
          id: string
          image_url: string | null
          measurements: string | null
          message: string | null
          name: string
          phone_number: string
          product_required: string | null
          source: string
          status: Database["public"]["Enums"]["inquiry_status"]
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          measurements?: string | null
          message?: string | null
          name: string
          phone_number: string
          product_required?: string | null
          source?: string
          status?: Database["public"]["Enums"]["inquiry_status"]
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          measurements?: string | null
          message?: string | null
          name?: string
          phone_number?: string
          product_required?: string | null
          source?: string
          status?: Database["public"]["Enums"]["inquiry_status"]
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string | null
          completed_on: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_featured: boolean
          is_published: boolean
          location: string | null
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          completed_on?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          location?: string | null
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          completed_on?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          location?: string | null
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          customer_image_url: string | null
          customer_name: string
          id: string
          is_visible: boolean
          location: string | null
          rating: number
          review_text: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_image_url?: string | null
          customer_name: string
          id?: string
          is_visible?: boolean
          location?: string | null
          rating?: number
          review_text: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_image_url?: string | null
          customer_name?: string
          id?: string
          is_visible?: boolean
          location?: string | null
          rating?: number
          review_text?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          icon_name: string
          id: string
          image_url: string | null
          is_active: boolean
          short_description: string
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_name: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          short_description: string
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_name?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          short_description?: string
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          about_content: string | null
          address_line: string | null
          background_color: string
          body_font: string
          business_description: string | null
          business_name: string
          cities_served: string[]
          city: string | null
          created_at: string
          default_language: string
          district: string | null
          email: string | null
          enabled_languages: Json
          favicon_url: string | null
          footer_content: Json
          google_business_profile_url: string | null
          google_maps_url: string | null
          gst_number: string | null
          heading_font: string
          hero_card_image_url: string | null
          hero_cta_primary_label: string | null
          hero_cta_primary_url: string | null
          hero_cta_secondary_label: string | null
          hero_cta_secondary_url: string | null
          hero_cta_tertiary_label: string | null
          hero_cta_tertiary_url: string | null
          hero_heading: string | null
          hero_image_url: string | null
          hero_qr_image_url: string | null
          hero_subheading: string | null
          homepage_banner_images: Json
          id: string
          language_switcher_position: string
          logo_mark_url: string | null
          logo_url: string | null
          og_image_url: string | null
          owner_name: string | null
          owner_photo_url: string | null
          phone_primary: string | null
          phone_secondary: string | null
          postal_code: string | null
          primary_color: string
          process_steps: Json
          secondary_color: string
          seo_defaults: Json
          social_links: Json
          state: string | null
          tagline: string | null
          text_color: string
          translation_enabled: boolean
          updated_at: string
          whatsapp_number: string | null
          why_choose_us: Json
          working_hours: Json
          years_experience: number | null
        }
        Insert: {
          about_content?: string | null
          address_line?: string | null
          background_color?: string
          body_font?: string
          business_description?: string | null
          business_name: string
          cities_served?: string[]
          city?: string | null
          created_at?: string
          default_language?: string
          district?: string | null
          email?: string | null
          enabled_languages?: Json
          favicon_url?: string | null
          footer_content?: Json
          google_business_profile_url?: string | null
          google_maps_url?: string | null
          gst_number?: string | null
          heading_font?: string
          hero_card_image_url?: string | null
          hero_cta_primary_label?: string | null
          hero_cta_primary_url?: string | null
          hero_cta_secondary_label?: string | null
          hero_cta_secondary_url?: string | null
          hero_cta_tertiary_label?: string | null
          hero_cta_tertiary_url?: string | null
          hero_heading?: string | null
          hero_image_url?: string | null
          hero_qr_image_url?: string | null
          hero_subheading?: string | null
          homepage_banner_images?: Json
          id?: string
          language_switcher_position?: string
          logo_mark_url?: string | null
          logo_url?: string | null
          og_image_url?: string | null
          owner_name?: string | null
          owner_photo_url?: string | null
          phone_primary?: string | null
          phone_secondary?: string | null
          postal_code?: string | null
          primary_color?: string
          process_steps?: Json
          secondary_color?: string
          seo_defaults?: Json
          social_links?: Json
          state?: string | null
          tagline?: string | null
          text_color?: string
          translation_enabled?: boolean
          updated_at?: string
          whatsapp_number?: string | null
          why_choose_us?: Json
          working_hours?: Json
          years_experience?: number | null
        }
        Update: {
          about_content?: string | null
          address_line?: string | null
          background_color?: string
          body_font?: string
          business_description?: string | null
          business_name?: string
          cities_served?: string[]
          city?: string | null
          created_at?: string
          default_language?: string
          district?: string | null
          email?: string | null
          enabled_languages?: Json
          favicon_url?: string | null
          footer_content?: Json
          google_business_profile_url?: string | null
          google_maps_url?: string | null
          gst_number?: string | null
          heading_font?: string
          hero_card_image_url?: string | null
          hero_cta_primary_label?: string | null
          hero_cta_primary_url?: string | null
          hero_cta_secondary_label?: string | null
          hero_cta_secondary_url?: string | null
          hero_cta_tertiary_label?: string | null
          hero_cta_tertiary_url?: string | null
          hero_heading?: string | null
          hero_image_url?: string | null
          hero_qr_image_url?: string | null
          hero_subheading?: string | null
          homepage_banner_images?: Json
          id?: string
          language_switcher_position?: string
          logo_mark_url?: string | null
          logo_url?: string | null
          og_image_url?: string | null
          owner_name?: string | null
          owner_photo_url?: string | null
          phone_primary?: string | null
          phone_secondary?: string | null
          postal_code?: string | null
          primary_color?: string
          process_steps?: Json
          secondary_color?: string
          seo_defaults?: Json
          social_links?: Json
          state?: string | null
          tagline?: string | null
          text_color?: string
          translation_enabled?: boolean
          updated_at?: string
          whatsapp_number?: string | null
          why_choose_us?: Json
          working_hours?: Json
          years_experience?: number | null
        }
        Relationships: []
      }
      site_visits: {
        Row: {
          created_at: string
          id: string
          page_path: string
          referrer: string | null
          session_key: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          page_path: string
          referrer?: string | null
          session_key: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          page_path?: string
          referrer?: string | null
          session_key?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: "admin"
      inquiry_status: "pending" | "contacted" | "completed" | "spam"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
      inquiry_status: ["pending", "contacted", "completed", "spam"],
    },
  },
} as const
