import type { Child, Homework, Mistake, Review, Attendance, Recipe, LeaveRequest } from '../types';

class DataManager {
  private children: Child[] = [
    { id: 'c1', name: '大宝', grade: '一年级', class: '1班', school: '实验小学' },
    { id: 'c2', name: '小宝', grade: '三年级', class: '2班', school: '实验小学' },
  ];

  private homeworks: Record<string, Homework[]> = {
    'c1': [
      { id: 'h1', subject: '数学', title: '口算第3页', status: 'completed', rating: 'A+', submitTime: '17:30', feedback: '口算速度很快，准确率高！' },
      { id: 'h2', subject: '英语', title: '抄写 Unit 1', status: 'completed', rating: 'A', submitTime: '17:45', feedback: '字母书写工整。' },
      { id: 'h3', subject: '语文', title: '古诗背诵', status: 'pending' },
    ],
    'c2': [
      { id: 'h4', subject: '数学', title: '三位数乘法', status: 'completed', rating: 'B', submitTime: '18:10', feedback: '计算过程要注意进位。' },
      { id: 'h5', subject: '科学', title: '植物生长观察日记', status: 'pending' },
    ]
  };

  private mistakes: Record<string, Mistake[]> = {
    'c1': [
      { id: 'm1', subject: '数学', title: '分数加减法', date: '02-25', reason: '审题不清', knowledgePoint: '异分母分数加减', imageUrl: 'https://via.placeholder.com/300x400?text=Math+Mistake', status: 'recorded' },
      { id: 'm2', subject: '语文', title: '近义词辨析', date: '02-24', reason: '词汇量积累不足', knowledgePoint: '近义词辨析', imageUrl: 'https://via.placeholder.com/300x400?text=Chinese+Mistake', status: 'recorded' },
    ],
    'c2': [
      { id: 'm3', subject: '英语', title: '一般过去时', date: '02-25', reason: '不规则动词记忆模糊', knowledgePoint: 'Grammar: Past Tense', imageUrl: 'https://via.placeholder.com/300x400?text=English+Mistake', status: 'recorded' },
    ]
  };

  private reviews: Record<string, Review[]> = {
    'c1': [
      { 
        id: 'r1', 
        date: '02-25', 
        overallRating: '优秀', 
        tags: ['专注', '积极', '坐姿端正'], 
        content: '今天表现非常棒，作业完成效率很高，特别是数学口算，全对！午休时也能安静入睡。', 
        images: ['https://via.placeholder.com/400x400?text=Review+1', 'https://via.placeholder.com/400x400?text=Review+2'] 
      },
      { 
        id: 'r2', 
        date: '02-24', 
        overallRating: '良好', 
        tags: ['需提高书写', '活泼'], 
        content: '英语抄写时有些分心，字迹不够工整，建议回家多练习一下。', 
        images: [] 
      }
    ],
    'c2': [
      { 
        id: 'r3', 
        date: '02-25', 
        overallRating: '良好', 
        tags: ['认真', '有点磨蹭'], 
        content: '做数学题时思考很深入，但是速度偏慢，导致最后有点赶时间。', 
        images: ['https://via.placeholder.com/400x400?text=Review+3'] 
      }
    ]
  };

  private attendances: Record<string, Attendance[]> = {
    'c1': [
      { id: 'a1', date: '2026-02-25', checkIn: '11:35', checkOut: '18:30', status: 'normal' }
    ],
    'c2': [
      { id: 'a2', date: '2026-02-25', checkIn: '11:40', checkOut: '18:45', status: 'normal' }
    ]
  };

  private recipes: Recipe[] = [
    {
      id: 'rc1',
      date: '2026-02-25',
      lunch: ['红烧肉', '清炒菜心', '紫菜蛋花汤'],
      lunchImage: 'https://via.placeholder.com/400x300?text=Lunch+Photo',
      dinner: ['西红柿炒鸡蛋', '肉末茄子'],
      dinnerImage: 'https://via.placeholder.com/400x300?text=Dinner+Photo',
      snack: ['苹果', '酸奶'],
      snackImage: 'https://via.placeholder.com/400x300?text=Snack+Photo'
    }
  ];

  private leaveRequests: LeaveRequest[] = [];

  getChildren() { return this.children; }
  
  getChildHomeworks(childId: string) { return this.homeworks[childId] || []; }
  
  getChildMistakes(childId: string) { return this.mistakes[childId] || []; }
  
  getChildReviews(childId: string) { return this.reviews[childId] || []; }
  
  getChildAttendance(childId: string, date: string) {
    return (this.attendances[childId] || []).find(a => a.date === date);
  }

  getTodayRecipe() {
    return this.recipes[0]; // Simplified
  }

  addLeaveRequest(request: LeaveRequest) {
    this.leaveRequests.unshift(request);
  }

  getLeaveRequests(childId: string) {
    return this.leaveRequests.filter(r => r.childId === childId);
  }
}

export const dataManager = new DataManager();
