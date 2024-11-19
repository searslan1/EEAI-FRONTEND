export type Question = {
    id: string
    content: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    tags: string[] // Yeni eklendi
    creator: string // Yeni eklendi
    timeLimit: number
    aiGenerated: boolean
  }
  
  export type Interview = {
    id: string
    title: string
    description: string
    startDate: string
    endDate: string
    reviewer: string
    questions: Question[]
    totalDuration: number
  }
  
  export type Reviewer = {
    id: string
    name: string
    position: string
    avatarUrl?: string // Opsiyonel profil resmi için
  }
  
  export type Candidate = {
    id: string
    name: string
    email: string
    appliedPosition: string
    interviewId: string
    status: 'Pending' | 'Reviewed' | 'Selected' | 'Rejected' // Durum ekledik
    videoUrl?: string // Opsiyonel video URL'si
  }
  
  export type InterviewSession = {
    id: string
    interviewId: string
    candidateId: string
    startTime: string
    endTime?: string
    notes?: string
    score?: number
    feedback?: string
  }
  