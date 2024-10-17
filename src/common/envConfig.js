import { z } from 'zod'

const configSchema = z.object({
    PORT: z.string(),
    NODE_ENV: z.string(),
    REACT_APP_DEV_BACKEND_URL: z.string(),
    REACT_APP_PRO_BACKEND_URL: z.string()
})

const configProject = configSchema.safeParse({
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_DEV_BACKEND_URL: process.env.REACT_APP_DEV_BACKEND_URL,
    REACT_APP_PRO_BACKEND_URL: process.env.REACT_APP_PRO_BACKEND_URL
})
if (!configProject.success) {
  
  console.error(configProject.error.issues)
  throw new Error('Các giá trị khai báo trong file .env không hợp lệ')
}

const envConfig = configProject.data
export default envConfig