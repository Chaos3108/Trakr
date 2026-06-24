import { useState } from "react";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../utils";

export function AuthPage({
    mode,
    onSwitch,
    onShowToast,
}: {
    mode: "login" | "signup";
    onSwitch: () => void;
    onShowToast: (payload: { title: string; description: string; type?: "success" | "error" }) => void;
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            onShowToast({ title: "Missing fields", description: "Email and password are required.", type: "error" });
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            onShowToast({ title: "Invalid email", description: "Please enter a valid email address.", type: "error" });
            return;
        }

        try {
            const response = await axios.post(`${URL}/auth/login`, {
                email: trimmedEmail,
                password: trimmedPassword,
            });
            console.log("Login successful:", response.data);
            const token = response.data.access_token;

            localStorage.setItem("token", token);
            onShowToast({ title: "Welcome back", description: "You have successfully signed in.", type: "success" });
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
            onShowToast({ title: "Login failed", description: "Please check your credentials and try again.", type: "error" });
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedName || !trimmedEmail || !trimmedPassword) {
            onShowToast({ title: "Missing fields", description: "Name, email, and password are required.", type: "error" });
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            onShowToast({ title: "Invalid email", description: "Please enter a valid email address.", type: "error" });
            return;
        }

        if (trimmedPassword.length < 6) {
            onShowToast({ title: "Weak password", description: "Password must be at least 6 characters long.", type: "error" });
            return;
        }

        try {
            const response = await axios.post(`${URL}/auth/register`, {
                name: trimmedName,
                email: trimmedEmail,
                password: trimmedPassword,
            });
            console.log("Signup successful:", response.data);
            onShowToast({ title: "Account created", description: "Your account was created successfully. Please sign in.", type: "success" });
            navigate("/login");
            mode === "signup" && onSwitch(); 
        } catch (error) {
            onShowToast({ title: "Signup failed", description: "We could not create your account. Please try again.", type: "error" });
        }
    };


    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
                <div
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-[120px]"
                    style={{ background: "radial-gradient(circle, #7c5cfc 0%, transparent 70%)" }}
                />
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="flex items-center justify-center gap-2.5 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
                        <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-foreground" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                        Trackr
                    </span>
                </div>

                <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
                    <h1 className="text-2xl font-semibold text-foreground mb-1" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                        {mode === "login" ? "Welcome back" : "Create your account"}
                    </h1>
                    <p className="text-muted-foreground text-sm mb-8">
                        {mode === "login" ? "Sign in to manage your job applications" : "Start tracking your job search today"}
                    </p>

                    <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-4">
                        {mode === "signup" && (
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">Full name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Alex Johnson"
                                    className="w-full px-4 py-2.5 rounded-lg bg-input-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="alex@example.com"
                                className="w-full px-4 py-2.5 rounded-lg bg-input-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-2.5 rounded-lg bg-input-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            onClick={mode === "login" ? handleLogin : handleSignup}
                            className="w-full py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-150 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 active:translate-y-0 text-sm mt-2"
                        >
                            {mode === "login" ? "Sign in" : "Create account"}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                        <button onClick={onSwitch} className="text-primary hover:text-primary/80 font-medium transition-colors">
                            {mode === "login" ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}