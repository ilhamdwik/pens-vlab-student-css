export const baseUrl = `${process.env.REACT_APP_BACKEND_URL}`;

export const compileApi = `${baseUrl}/api/v1/compile`;
export const quizApi = `${baseUrl}/api/v1/quizzes`;
export const quizDetailApi = `${baseUrl}/api/v1/quizzes/`;
export const submitQuizApi = `${baseUrl}/api/v1/quizzes/submit/`;
export const courseApi = `${baseUrl}/api/v1/courses`;
export const lessonApi = `${baseUrl}/api/v1/lesson`;
export const updateLessonProgressApi = `${baseUrl}/api/v1/lesson/update-progress`;
export const userCheckApi = `${baseUrl}/api/v1/user/check`;
export const etholUserDetailApi =
  "https://ethol.pens.ac.id/api/vlab/info-akun?key_vlab=etholv2-vlab";

// api forums
export const allForumsApi = `${baseUrl}/api/v1/forum/students`;
export const forumsDetailApi = `${baseUrl}/api/v1/forum/students/`;
export const createForumsApi = `${baseUrl}/api/v1/forum/students/create`;
export const deleteForumsApi = `${baseUrl}/api/v1/forum/students/delete/`;

// api comments
export const getCommentsApi = `${baseUrl}/api/v1/comments/students`;
export const postCommentsApi = `${baseUrl}/api/v1/comments/students/create`;
export const deleteCommentsApi = `${baseUrl}/api/v1/comments/students/delete/:id`;