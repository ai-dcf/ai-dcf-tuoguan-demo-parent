export type ViewState = 'home' | 'learning' | 'mine' | 'homework-detail' | 'mistake-detail' | 'leave-apply' | 'history' | 'recipe' | 'review';

export interface Child {
  id: string;
  name: string;
  grade: string;
  class: string;
  school: string;
  avatar?: string;
}

export interface Homework {
  id: string;
  subject: string;
  title: string;
  status: 'pending' | 'submitted' | 'completed';
  rating?: string;
  submitTime?: string;
  images?: string[];
  feedback?: string;
}

export interface Mistake {
  id: string;
  subject: string;
  title: string;
  date: string;
  reason: string;
  knowledgePoint: string;
  imageUrl: string;
  status: 'recorded' | 'practiced' | 'mastered';
}

export interface Review {
  id: string;
  date: string;
  overallRating: '优秀' | '良好' | '一般' | '需关注';
  tags: string[];
  content: string;
  images?: string[];
}

export interface Attendance {
  id: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'normal' | 'late' | 'leave' | 'absent';
}

export interface Recipe {
  id: string;
  date: string;
  lunch: string[];
  lunchImage?: string;
  dinner: string[];
  dinnerImage?: string;
  snack: string[];
  snackImage?: string;
}

export interface LeaveRequest {
  id: string;
  childId: string;
  date: string;
  type: '病假' | '事假' | '其他';
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectReason?: string;
  createdAt: string;
}
