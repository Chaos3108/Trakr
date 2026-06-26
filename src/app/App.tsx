import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import * as Toast from "@radix-ui/react-toast";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { AuthPage } from "./pages/AuthPage";
import { AddJobPage } from "./pages/AddJobPage";
import { DashboardPage } from "../app/pages/DashboardPage";
import { JobDetailPage } from "./pages/JobDetailPage";

type ToastPayload = {
    title: string;
    description: string;
    type?: "success" | "error";
};

const ToastContext = createContext<(payload: ToastPayload) => void>(() => undefined);

export function useToast() {
    return useContext(ToastContext);
}

function ProtectedRoute({ children }: { children: ReactNode }) {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppToastProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [toast, setToast] = useState<ToastPayload | null>(null);

    const showToast = useMemo(() => (payload: ToastPayload) => {
        setToast(payload);
        setOpen(true);
    }, []);

    return (
        <Toast.Provider swipeDirection="right">
            <ToastContext.Provider value={showToast}>
                <Toast.Root
                    open={open}
                    onOpenChange={setOpen}
                    className={`fixed bottom-4 right-4 z-50 w-[min(360px,calc(100vw-2rem))] rounded-xl border p-4 shadow-xl ${
                        toast?.type === "error" ? "border-red-500/30 bg-red-950/90" : "border-border bg-card"
                    }`}
                >
                    <Toast.Title className="font-semibold text-foreground">{toast?.title ?? "Trackr"}</Toast.Title>
                    <Toast.Description className="mt-1 text-sm text-muted-foreground">
                        {toast?.description ?? "Notifications will appear here."}
                    </Toast.Description>
                    <Toast.Action asChild altText="Dismiss notification">
                        <button className="mt-3 text-sm font-medium text-primary">Dismiss</button>
                    </Toast.Action>
                    <Toast.Close
                        className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
                        aria-label="Close"
                    >
                        ×
                    </Toast.Close>
                </Toast.Root>
                {children}
                <Toast.Viewport className="fixed bottom-4 right-4 z-[60] flex w-[390px] max-w-[100vw] list-none flex-col gap-2 p-4 outline-none" />
            </ToastContext.Provider>
        </Toast.Provider>
    );
}

function AppContent() {
    const navigate = useNavigate();
    const showToast = useToast();
    const [authMode, setAuthMode] = useState<"login" | "signup">("login");





    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

 
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <AuthPage
                        mode={authMode}
                        onSwitch={() => setAuthMode(authMode === "login" ? "signup" : "login")}
                        onShowToast={showToast}
                    />
                }
            />
            <Route
                path="/add-job"
                element={
                    <ProtectedRoute>
                        <AddJobPage
                        
                            onCancel={() => navigate("/dashboard")}
                            onLogout={handleLogout}
                        />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/job-detail/:id"
                element={
                    <ProtectedRoute>
                        
                            <JobDetailPage
                                
                                onBack={() => navigate("/dashboard")}
                            
                                onLogout={handleLogout}
                            />
                        
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage
                            
                            onAddJob={() => navigate("/add-job")}
                           
                            onLogout={handleLogout}
                        />
                    </ProtectedRoute>
                }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}

export default function App() {
    return (
        <Router>
            <AppToastProvider>
                <AppContent />
            </AppToastProvider>
            <Analytics />
        </Router>
    );
}
