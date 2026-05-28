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
      agents: {
        Row: {
          created_at: string
          email: string | null
          evolution_api_key: string | null
          evolution_api_url: string | null
          google_calendar_id: string | null
          id: string
          name: string
          status: string | null
          whatsapp_bot_number: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          evolution_api_key?: string | null
          evolution_api_url?: string | null
          google_calendar_id?: string | null
          id?: string
          name: string
          status?: string | null
          whatsapp_bot_number: string
        }
        Update: {
          created_at?: string
          email?: string | null
          evolution_api_key?: string | null
          evolution_api_url?: string | null
          google_calendar_id?: string | null
          id?: string
          name?: string
          status?: string | null
          whatsapp_bot_number?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          agent_id: string | null
          budget: number | null
          budget_raw: string | null
          created_at: string
          interested_in_visit: boolean
          last_bot_reply: string
          last_message: string
          location_preference: string | null
          name: string | null
          next_step: string
          notificado_admin: boolean | null
          objective: string
          property_type: string | null
          provider: string
          requested_documents: string[]
          role: string
          source: string
          specifications: Json | null
          status: string
          summary: string
          updated_at: string
          whatsapp: string
        }
        Insert: {
          agent_id?: string | null
          budget?: number | null
          budget_raw?: string | null
          created_at?: string
          interested_in_visit?: boolean
          last_bot_reply: string
          last_message: string
          location_preference?: string | null
          name?: string | null
          next_step?: string
          notificado_admin?: boolean | null
          objective?: string
          property_type?: string | null
          provider?: string
          requested_documents?: string[]
          role?: string
          source?: string
          specifications?: Json | null
          status?: string
          summary?: string
          updated_at?: string
          whatsapp: string
        }
        Update: {
          agent_id?: string | null
          budget?: number | null
          budget_raw?: string | null
          created_at?: string
          interested_in_visit?: boolean
          last_bot_reply?: string
          last_message?: string
          location_preference?: string | null
          name?: string | null
          next_step?: string
          notificado_admin?: boolean | null
          objective?: string
          property_type?: string | null
          provider?: string
          requested_documents?: string[]
          role?: string
          source?: string
          specifications?: Json | null
          status?: string
          summary?: string
          updated_at?: string
          whatsapp?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          agent_id: string | null
          contract_type: string | null
          created_at: string
          descricao_completa: string | null
          description: string | null
          id: string
          image_url: string | null
          link_remax: string | null
          location: string | null
          price: number | null
          property_type: string | null
          title: string
          url_anuncio: string | null
        }
        Insert: {
          agent_id?: string | null
          contract_type?: string | null
          created_at?: string
          descricao_completa?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          link_remax?: string | null
          location?: string | null
          price?: number | null
          property_type?: string | null
          title: string
          url_anuncio?: string | null
        }
        Update: {
          agent_id?: string | null
          contract_type?: string | null
          created_at?: string
          descricao_completa?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          link_remax?: string | null
          location?: string | null
          price?: number | null
          property_type?: string | null
          title?: string
          url_anuncio?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      property_matches: {
        Row: {
          id: string
          lead_whatsapp: string | null
          notified_at: string
          property_url: string
        }
        Insert: {
          id?: string
          lead_whatsapp?: string | null
          notified_at?: string
          property_url: string
        }
        Update: {
          id?: string
          lead_whatsapp?: string | null
          notified_at?: string
          property_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_matches_lead_whatsapp_fkey"
            columns: ["lead_whatsapp"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["whatsapp"]
          },
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
    Enums: {},
  },
} as const
