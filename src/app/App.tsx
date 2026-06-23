import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { AddJobPage } from "./pages/AddJobPage";
import { DashboardPage } from "../app/pages/DashboardPage";
import { JobDetailPage } from "./pages/JobDetailPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppContent() {
    const navigate = useNavigate();
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
            <AppContent />
        </Router>
    );
}
