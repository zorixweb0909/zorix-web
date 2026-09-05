"use client";
import { authUser } from "./supabase";
export type SessionUser = { id: string; email?: string };
const KEY = "zorix_session_v1";
export function getToken(){ return typeof window === "undefined" ? "" : localStorage.getItem(KEY) || ""; }
export function setToken(token:string){ localStorage.setItem(KEY, token); window.dispatchEvent(new Event("zorix-auth")); }
export function clearToken(){ localStorage.removeItem(KEY); window.dispatchEvent(new Event("zorix-auth")); }
export async function currentUser(){ const t=getToken(); if(!t) return null; const u=await authUser(t); if(!u){clearToken();return null;} return u as SessionUser; }
