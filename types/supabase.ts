export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      exp_categories: {
        Row: {
          author: string | null
          created_at: string
          description: string | null
          id: number
          is_deleted: boolean | null
          name: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string
          description?: string | null
          id?: number
          is_deleted?: boolean | null
          name?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string
          description?: string | null
          id?: number
          is_deleted?: boolean | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_exp_categories_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      exp_transactions: {
        Row: {
          amount: number | null
          author: string | null
          category_id: number | null
          created_at: string
          description: string | null
          id: number
          is_deleted: boolean | null
          is_expense: boolean | null
        }
        Insert: {
          amount?: number | null
          author?: string | null
          category_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          is_deleted?: boolean | null
          is_expense?: boolean | null
        }
        Update: {
          amount?: number | null
          author?: string | null
          category_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          is_deleted?: boolean | null
          is_expense?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "public_exp_transactions_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_exp_transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "exp_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      kiriman: {
        Row: {
          created_at: string
          id: number
          jenis: string | null
          nama: string | null
          nilai_paket: number | null
          ongkos_kirim: number | null
          tanggal: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          jenis?: string | null
          nama?: string | null
          nilai_paket?: number | null
          ongkos_kirim?: number | null
          tanggal?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          jenis?: string | null
          nama?: string | null
          nilai_paket?: number | null
          ongkos_kirim?: number | null
          tanggal?: string | null
        }
        Relationships: []
      }
      laporans: {
        Row: {
          author: string | null
          created_at: string | null
          deleted_at: string | null
          description: string | null
          id: number
          title: string | null
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      liked_products: {
        Row: {
          created_at: string | null
          id: number
          product_id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          product_id: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          product_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "liked_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      live_wa: {
        Row: {
          code: string | null
          created_at: string
          id: number
          name: string | null
          price: number | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          id?: number
          name?: string | null
          price?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: number
          name?: string | null
          price?: number | null
        }
        Relationships: []
      }
      products: {
        Row: {
          barcode: string | null
          category_id: number | null
          code: string | null
          created_at: string | null
          description: string | null
          hpp: number | null
          id: number
          image: string | null
          is_publish: boolean
          isi: string | null
          name: string | null
          price: number | null
          satuan: string | null
          stok: number | null
        }
        Insert: {
          barcode?: string | null
          category_id?: number | null
          code?: string | null
          created_at?: string | null
          description?: string | null
          hpp?: number | null
          id?: number
          image?: string | null
          is_publish: boolean
          isi?: string | null
          name?: string | null
          price?: number | null
          satuan?: string | null
          stok?: number | null
        }
        Update: {
          barcode?: string | null
          category_id?: number | null
          code?: string | null
          created_at?: string | null
          description?: string | null
          hpp?: number | null
          id?: number
          image?: string | null
          is_publish?: boolean
          isi?: string | null
          name?: string | null
          price?: number | null
          satuan?: string | null
          stok?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      sekawan_employees: {
        Row: {
          created_at: string
          email: string | null
          fullname: string | null
          id: number
          manager_email: string | null
          role: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          fullname?: string | null
          id?: number
          manager_email?: string | null
          role?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          fullname?: string | null
          id?: number
          manager_email?: string | null
          role?: string | null
          status?: string | null
        }
        Relationships: []
      }
      sekawan_kendaraan: {
        Row: {
          angkutan: string | null
          created_at: string
          id: number
          kepemilikan: string | null
          plat: string | null
          status: string | null
        }
        Insert: {
          angkutan?: string | null
          created_at?: string
          id?: number
          kepemilikan?: string | null
          plat?: string | null
          status?: string | null
        }
        Update: {
          angkutan?: string | null
          created_at?: string
          id?: number
          kepemilikan?: string | null
          plat?: string | null
          status?: string | null
        }
        Relationships: []
      }
      sekawan_kendaraan_bbm: {
        Row: {
          amount: number | null
          bbm: string | null
          created_at: string
          id: number
          kendaraan_id: number | null
          liter: number | null
        }
        Insert: {
          amount?: number | null
          bbm?: string | null
          created_at?: string
          id?: number
          kendaraan_id?: number | null
          liter?: number | null
        }
        Update: {
          amount?: number | null
          bbm?: string | null
          created_at?: string
          id?: number
          kendaraan_id?: number | null
          liter?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sekawan_kendaraan_bbm_kendaraan_id_fkey"
            columns: ["kendaraan_id"]
            isOneToOne: false
            referencedRelation: "sekawan_kendaraan"
            referencedColumns: ["id"]
          },
        ]
      }
      sekawan_kendaraan_log: {
        Row: {
          actor: string | null
          created_at: string
          deskripsi: string | null
          id: number
          kendaraan_id: number | null
          tipe: string | null
        }
        Insert: {
          actor?: string | null
          created_at?: string
          deskripsi?: string | null
          id?: number
          kendaraan_id?: number | null
          tipe?: string | null
        }
        Update: {
          actor?: string | null
          created_at?: string
          deskripsi?: string | null
          id?: number
          kendaraan_id?: number | null
          tipe?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sekawan_kendaraan_log_kendaraan_id_fkey"
            columns: ["kendaraan_id"]
            isOneToOne: false
            referencedRelation: "sekawan_kendaraan"
            referencedColumns: ["id"]
          },
        ]
      }
      sekawan_kendaraan_pemakaian: {
        Row: {
          created_at: string
          deskripsi: string | null
          id: number
          kendaraan_id: number | null
          tujuan: string | null
        }
        Insert: {
          created_at?: string
          deskripsi?: string | null
          id?: number
          kendaraan_id?: number | null
          tujuan?: string | null
        }
        Update: {
          created_at?: string
          deskripsi?: string | null
          id?: number
          kendaraan_id?: number | null
          tujuan?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sekawan_kendaraan_pemakaian_kendaraan_id_fkey"
            columns: ["kendaraan_id"]
            isOneToOne: false
            referencedRelation: "sekawan_kendaraan"
            referencedColumns: ["id"]
          },
        ]
      }
      sekawan_kendaraan_service: {
        Row: {
          bengkel: string | null
          created_at: string
          deskripsi: string | null
          id: number
          kendaraan_id: number | null
          odometer: string | null
          subjek: string | null
        }
        Insert: {
          bengkel?: string | null
          created_at?: string
          deskripsi?: string | null
          id?: number
          kendaraan_id?: number | null
          odometer?: string | null
          subjek?: string | null
        }
        Update: {
          bengkel?: string | null
          created_at?: string
          deskripsi?: string | null
          id?: number
          kendaraan_id?: number | null
          odometer?: string | null
          subjek?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sekawan_kendaraan_service_kendaraan_id_fkey"
            columns: ["kendaraan_id"]
            isOneToOne: false
            referencedRelation: "sekawan_kendaraan"
            referencedColumns: ["id"]
          },
        ]
      }
      sekawan_request: {
        Row: {
          created_at: string
          deskripsi: string | null
          driver: number | null
          id: number
          kendaraan_id: number | null
          status: string | null
        }
        Insert: {
          created_at?: string
          deskripsi?: string | null
          driver?: string | null
          id?: number
          kendaraan_id?: number | null
          status?: string | null
        }
        Update: {
          created_at?: string
          deskripsi?: string | null
          driver?: number | null
          id?: number
          kendaraan_id?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sekawan_request_kendaraan_id_fkey"
            columns: ["kendaraan_id"]
            isOneToOne: false
            referencedRelation: "sekawan_kendaraan"
            referencedColumns: ["id"]
          },
        ]
      }
      sekawan_request_approvals: {
        Row: {
          approved: boolean | null
          created_at: string
          deskripsi: string | null
          email: string | null
          id: number
          request_id: number | null
        }
        Insert: {
          approved?: boolean | null
          created_at?: string
          deskripsi?: string | null
          email?: string | null
          id?: number
          request_id?: number | null
        }
        Update: {
          approved?: boolean | null
          created_at?: string
          deskripsi?: string | null
          email?: string | null
          id?: number
          request_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sekawan_request_approvals_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "sekawan_request"
            referencedColumns: ["id"]
          },
        ]
      }
      sekawan_request_log: {
        Row: {
          actor: string | null
          created_at: string
          deskripsi: string | null
          id: number
          request_id: number | null
          tipe: string | null
        }
        Insert: {
          actor?: string | null
          created_at?: string
          deskripsi?: string | null
          id?: number
          request_id?: number | null
          tipe?: string | null
        }
        Update: {
          actor?: string | null
          created_at?: string
          deskripsi?: string | null
          id?: number
          request_id?: number | null
          tipe?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sekawan_request_log_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "sekawan_request"
            referencedColumns: ["id"]
          },
        ]
      }
      semesta_buku: {
        Row: {
          base_price: number | null
          category: string | null
          code: string | null
          cover: string | null
          created_at: string
          id: number
          jastip_price: number | null
          publisher: string | null
          qty: number | null
          sell_price: number | null
          title: string | null
        }
        Insert: {
          base_price?: number | null
          category?: string | null
          code?: string | null
          cover?: string | null
          created_at?: string
          id?: number
          jastip_price?: number | null
          publisher?: string | null
          qty?: number | null
          sell_price?: number | null
          title?: string | null
        }
        Update: {
          base_price?: number | null
          category?: string | null
          code?: string | null
          cover?: string | null
          created_at?: string
          id?: number
          jastip_price?: number | null
          publisher?: string | null
          qty?: number | null
          sell_price?: number | null
          title?: string | null
        }
        Relationships: []
      }
      semesta_buku_2024: {
        Row: {
          base_price: number | null
          cover: string | null
          created_at: string
          diskon: string | null
          id: number
          jastip_price: number | null
          judul: string | null
          kategori: string | null
          penerbit: string | null
          sell_price: number | null
        }
        Insert: {
          base_price?: number | null
          cover?: string | null
          created_at?: string
          diskon?: string | null
          id?: number
          jastip_price?: number | null
          judul?: string | null
          kategori?: string | null
          penerbit?: string | null
          sell_price?: number | null
        }
        Update: {
          base_price?: number | null
          cover?: string | null
          created_at?: string
          diskon?: string | null
          id?: number
          jastip_price?: number | null
          judul?: string | null
          kategori?: string | null
          penerbit?: string | null
          sell_price?: number | null
        }
        Relationships: []
      }
      semesta_buku_3: {
        Row: {
          base_price: number | null
          category: string | null
          code: string | null
          cover: string | null
          created_at: string
          id: number
          jastip_price: number | null
          publisher: string | null
          qty: number | null
          sell_price: number | null
          title: string | null
        }
        Insert: {
          base_price?: number | null
          category?: string | null
          code?: string | null
          cover?: string | null
          created_at?: string
          id?: number
          jastip_price?: number | null
          publisher?: string | null
          qty?: number | null
          sell_price?: number | null
          title?: string | null
        }
        Update: {
          base_price?: number | null
          category?: string | null
          code?: string | null
          cover?: string | null
          created_at?: string
          id?: number
          jastip_price?: number | null
          publisher?: string | null
          qty?: number | null
          sell_price?: number | null
          title?: string | null
        }
        Relationships: []
      }
      semesta_diskon_30: {
        Row: {
          cover: string | null
          created_at: string
          id: number
          jastip_price: number | null
          sell_price: number | null
          title: string | null
        }
        Insert: {
          cover?: string | null
          created_at?: string
          id?: number
          jastip_price?: number | null
          sell_price?: number | null
          title?: string | null
        }
        Update: {
          cover?: string | null
          created_at?: string
          id?: number
          jastip_price?: number | null
          sell_price?: number | null
          title?: string | null
        }
        Relationships: []
      }
      semesta_final: {
        Row: {
          code: string | null
          created_at: string
          id: number
          jastip_price: number | null
          sell_price: number | null
          title: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          id?: number
          jastip_price?: number | null
          sell_price?: number | null
          title?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: number
          jastip_price?: number | null
          sell_price?: number | null
          title?: string | null
        }
        Relationships: []
      }
      wabiz_products: {
        Row: {
          created_at: string
          id: number
          message_id: string | null
          price: number | null
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          message_id?: string | null
          price?: number | null
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          message_id?: string | null
          price?: number | null
          title?: string | null
        }
        Relationships: []
      }
      wabiz_replies: {
        Row: {
          created_at: string
          id: number
          message_id: string | null
          name: string | null
          phone: string | null
          product_id: string | null
          qty: number | null
          status: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          message_id?: string | null
          name?: string | null
          phone?: string | null
          product_id?: string | null
          qty?: number | null
          status?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          message_id?: string | null
          name?: string | null
          phone?: string | null
          product_id?: string | null
          qty?: number | null
          status?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      distinct_kategori: {
        Row: {
          kategori: string | null
        }
        Relationships: []
      }
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
