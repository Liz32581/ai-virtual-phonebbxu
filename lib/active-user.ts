// lib/active-user.ts
// Tracks the currently active UserIdentity ID.
// All data-isolation logic (chat, moments, checkphone) reads from here.

import { loadBindingConfig, loadUserIdentities } from "./settings-storage";

export const ACTIVE_USER_CHANGED_EVENT = "active-user-identity-changed";

let _cachedActiveId: string | null = null;

/**
 * Get the currently active user identity ID.
 * Uses globalDefaults.userIdentityId from the binding config;
 * falls back to the first identity in the list.
 */
export function getActiveUserIdentityId(): string {
    if (typeof window === "undefined") return "__default__";
    const config = loadBindingConfig();
    const gid = config.globalDefaults.userIdentityId;
    if (gid) return gid;
    const identities = loadUserIdentities();
    return identities.length > 0 ? identities[0].id : "__default__";
}

/**
 * Check if the active user identity changed and fire the event if so.
 * Called after settings-bindings-updated.
 */
export function checkActiveUserChanged(): void {
    const newId = getActiveUserIdentityId();
    if (_cachedActiveId !== null && _cachedActiveId !== newId) {
        window.dispatchEvent(new CustomEvent(ACTIVE_USER_CHANGED_EVENT, {
            detail: { previousId: _cachedActiveId, currentId: newId },
        }));
    }
    _cachedActiveId = newId;
}

/**
 * Initialize the cached active user ID. Call once at startup.
 */
export function initActiveUser(): void {
    _cachedActiveId = getActiveUserIdentityId();
}