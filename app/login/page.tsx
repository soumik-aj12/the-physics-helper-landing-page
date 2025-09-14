import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LoginForm from "@/components/Authentication/LoginForm"
import Wrapper from "@/components/Wrapper/Wrapper"

export default function LoginPage() {
  return (
    <Wrapper>
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </Wrapper>
  )
}
