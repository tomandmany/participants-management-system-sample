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
      boothPrograms: {
        Row: {
          boothGenre: Database["public"]["Enums"]["boothGenre"]
          catchphrase: string
          categoryType: Database["public"]["Enums"]["categoryType"]
          createdAt: string
          details: string
          id: string
          isDrinkAvailable: Database["public"]["Enums"]["isDrinkAvailable"]
          isEcoTrayUsed: Database["public"]["Enums"]["isEcoTrayUsed"]
          participantId: string
          photographPermission: Database["public"]["Enums"]["photographPermission"]
          programImage: string | null
          programName: string
        }
        Insert: {
          boothGenre: Database["public"]["Enums"]["boothGenre"]
          catchphrase: string
          categoryType: Database["public"]["Enums"]["categoryType"]
          createdAt?: string
          details: string
          id?: string
          isDrinkAvailable: Database["public"]["Enums"]["isDrinkAvailable"]
          isEcoTrayUsed: Database["public"]["Enums"]["isEcoTrayUsed"]
          participantId: string
          photographPermission: Database["public"]["Enums"]["photographPermission"]
          programImage?: string | null
          programName: string
        }
        Update: {
          boothGenre?: Database["public"]["Enums"]["boothGenre"]
          catchphrase?: string
          categoryType?: Database["public"]["Enums"]["categoryType"]
          createdAt?: string
          details?: string
          id?: string
          isDrinkAvailable?: Database["public"]["Enums"]["isDrinkAvailable"]
          isEcoTrayUsed?: Database["public"]["Enums"]["isEcoTrayUsed"]
          participantId?: string
          photographPermission?: Database["public"]["Enums"]["photographPermission"]
          programImage?: string | null
          programName?: string
        }
        Relationships: [
          {
            foreignKeyName: "boothPrograms_participantId_fkey"
            columns: ["participantId"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
        ]
      }
      outstagePrograms: {
        Row: {
          catchphrase: string
          createdAt: string
          details: string
          eventDate: Database["public"]["Enums"]["eventDate"]
          id: string
          outstageGenre: Database["public"]["Enums"]["outstageGenre"]
          outstageVenue: Database["public"]["Enums"]["outstageVenue"]
          participantId: string
          photographPermission: Database["public"]["Enums"]["photographPermission"]
          programImage: string | null
          programName: string
        }
        Insert: {
          catchphrase: string
          createdAt?: string
          details: string
          eventDate: Database["public"]["Enums"]["eventDate"]
          id?: string
          outstageGenre: Database["public"]["Enums"]["outstageGenre"]
          outstageVenue: Database["public"]["Enums"]["outstageVenue"]
          participantId: string
          photographPermission: Database["public"]["Enums"]["photographPermission"]
          programImage?: string | null
          programName: string
        }
        Update: {
          catchphrase?: string
          createdAt?: string
          details?: string
          eventDate?: Database["public"]["Enums"]["eventDate"]
          id?: string
          outstageGenre?: Database["public"]["Enums"]["outstageGenre"]
          outstageVenue?: Database["public"]["Enums"]["outstageVenue"]
          participantId?: string
          photographPermission?: Database["public"]["Enums"]["photographPermission"]
          programImage?: string | null
          programName?: string
        }
        Relationships: [
          {
            foreignKeyName: "outstagePrograms_participantId_fkey"
            columns: ["participantId"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
        ]
      }
      participants: {
        Row: {
          createdAt: string
          id: string
          participantName: string
          ruby: string
        }
        Insert: {
          createdAt?: string
          id?: string
          participantName: string
          ruby: string
        }
        Update: {
          createdAt?: string
          id?: string
          participantName?: string
          ruby?: string
        }
        Relationships: []
      }
      participantSocialMedias: {
        Row: {
          createdAt: string
          id: string
          participantId: string
          socialMediaModelId: string
          url: string
        }
        Insert: {
          createdAt?: string
          id?: string
          participantId: string
          socialMediaModelId: string
          url: string
        }
        Update: {
          createdAt?: string
          id?: string
          participantId?: string
          socialMediaModelId?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "participantSocialMedias_participantId_fkey"
            columns: ["participantId"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participantSocialMedias_socialMediaModelId_fkey"
            columns: ["socialMediaModelId"]
            isOneToOne: false
            referencedRelation: "socialMediaModels"
            referencedColumns: ["id"]
          },
        ]
      }
      roomPrograms: {
        Row: {
          catchphrase: string
          createdAt: string
          details: string
          eventBuilding: Database["public"]["Enums"]["eventBuilding"]
          eventDate: Database["public"]["Enums"]["eventDate"]
          eventRoom: string
          id: string
          isEcoTrayUsed: Database["public"]["Enums"]["isEcoTrayUsed"]
          isEventTicketAvailable: Database["public"]["Enums"]["isEventTicketAvailable"]
          isGoodsAvailable: Database["public"]["Enums"]["isGoodsAvailable"]
          isReservationRequired: Database["public"]["Enums"]["isReservationRequired"]
          participantId: string
          photographPermission: Database["public"]["Enums"]["photographPermission"]
          programImage: string | null
          programName: string
          roomGenre: Database["public"]["Enums"]["roomGenre"]
        }
        Insert: {
          catchphrase: string
          createdAt?: string
          details: string
          eventBuilding: Database["public"]["Enums"]["eventBuilding"]
          eventDate: Database["public"]["Enums"]["eventDate"]
          eventRoom: string
          id?: string
          isEcoTrayUsed: Database["public"]["Enums"]["isEcoTrayUsed"]
          isEventTicketAvailable: Database["public"]["Enums"]["isEventTicketAvailable"]
          isGoodsAvailable: Database["public"]["Enums"]["isGoodsAvailable"]
          isReservationRequired: Database["public"]["Enums"]["isReservationRequired"]
          participantId: string
          photographPermission: Database["public"]["Enums"]["photographPermission"]
          programImage?: string | null
          programName: string
          roomGenre: Database["public"]["Enums"]["roomGenre"]
        }
        Update: {
          catchphrase?: string
          createdAt?: string
          details?: string
          eventBuilding?: Database["public"]["Enums"]["eventBuilding"]
          eventDate?: Database["public"]["Enums"]["eventDate"]
          eventRoom?: string
          id?: string
          isEcoTrayUsed?: Database["public"]["Enums"]["isEcoTrayUsed"]
          isEventTicketAvailable?: Database["public"]["Enums"]["isEventTicketAvailable"]
          isGoodsAvailable?: Database["public"]["Enums"]["isGoodsAvailable"]
          isReservationRequired?: Database["public"]["Enums"]["isReservationRequired"]
          participantId?: string
          photographPermission?: Database["public"]["Enums"]["photographPermission"]
          programImage?: string | null
          programName?: string
          roomGenre?: Database["public"]["Enums"]["roomGenre"]
        }
        Relationships: [
          {
            foreignKeyName: "roomPrograms_participantId_fkey"
            columns: ["participantId"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
        ]
      }
      socialMediaModels: {
        Row: {
          createdAt: string
          id: string
          socialMediaModelName: string
        }
        Insert: {
          createdAt?: string
          id?: string
          socialMediaModelName: string
        }
        Update: {
          createdAt?: string
          id?: string
          socialMediaModelName?: string
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
      boothGenre: "模擬店ジャンル1" | "模擬店ジャンル2" | "模擬店ジャンル3"
      categoryType: "タイプ1" | "タイプ2" | "タイプ3"
      eventBuilding: "第一校舎" | "メディア棟" | "和泉ラーニングスクエア"
      eventDate: "2日" | "3日" | "4日"
      isDrinkAvailable: "販売有り" | "販売無し" | "不明"
      isEcoTrayUsed: "利用有り" | "利用無し" | "不明"
      isEventTicketAvailable: "チケット有り" | "チケット無し" | "不明"
      isGoodsAvailable: "販売有り" | "販売無し" | "不明"
      isReservationRequired: "整理券有り" | "整理券無し" | "不明"
      outstageGenre: "音楽" | "ダンス" | "パフォーマンス"
      outstageVenue:
        | "メインステージ"
        | "パフォーマンスエリア"
        | "エントランスエリア"
      photographPermission: "撮影可" | "撮影不可" | "不明"
      roomGenre: "教室ジャンル1" | "教室ジャンル2" | "教室ジャンル3"
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
