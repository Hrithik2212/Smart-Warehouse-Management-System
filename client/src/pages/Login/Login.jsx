import React, { useContext } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import AuthContext from '@/context/AuthContext'

const Login = () => {
  let {loginUser} = useContext(AuthContext)
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Smart Warehouse</CardTitle>
          <CardDescription>Login in to your account</CardDescription>
        </CardHeader>
        <form onSubmit={loginUser}>
            <CardContent>
              
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" placeholder="Enter your password" />
                  </div>
                </div>
              
            </CardContent>
            <CardFooter className="flex justify-between bg-[rgb(85, 34, 208)]">
              <Button type="submit">Login</Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Login