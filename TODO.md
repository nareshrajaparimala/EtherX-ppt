# Implementation Plan for UI Improvements

## Information Gathered
- **Landing Page (client/src/pages/Landing.jsx)**: Contains the main features grid with "Advanced Charts", "Drawing Tools", "Export Options". Header has "EtherXPPT" with "E" symbol. Footer has "© 2024 EtherXPPT".
- **Dashboard (client/src/pages/Dashboard.jsx)**: Top menu bar with navigation items, includes dark mode toggle.
- **Toolbar (client/src/components/Toolbar.jsx)**: Contains buttons for templates, format, draw, add-ins, export, dark mode toggle.
- **Authentication**: Uses AuthContext for login checks.
- **Dark Mode**: Managed via ThemeContext, toggles exist in multiple places.
- **Logo**: Official EtherX logo is DOCS-LOGO-final-transparent.png in client/public/.

## Plan
1. **Update Landing Page Features**:
   - Replace "Advanced Charts" with "New Presentation" (navigate to dashboard/create new).
   - Replace "Drawing Tools" with "Favourites" (check auth, show panel or login prompt).
   - Replace "Export Options" with "History" (check auth, show panel or login prompt).

2. **Remove Clutter**:
   - In Toolbar.jsx: Remove Templates, Format, Draw, Add-ins, Export buttons.
   - In Dashboard.jsx: Remove dark mode toggle button.
   - In Landing.jsx: Remove dark mode toggle button.
   - Remove auto-save indicator from status bar.
   - Remove slideshow, voice recording, spell check references (if any).

3. **Update Branding**:
   - In Landing.jsx header: Replace "E" symbol with EtherX logo.
   - In Landing.jsx footer: Update copyright to "© 2025".

4. **Authentication UI Fix**:
   - Ensure Sign In button in Login.jsx has good contrast (already seems fine, but verify).
   - Dark mode toggle functionality remains via context, but visible toggles removed.

5. **Secure Features**:
   - For Favourites and History in Landing: Use AuthContext to check if user is logged in, else show login prompt.

## Dependent Files to Edit
- client/src/pages/Landing.jsx
- client/src/pages/Dashboard.jsx
- client/src/components/Toolbar.jsx
- client/src/pages/Login.jsx (minor contrast check)

## Followup Steps
- Test navigation to new presentation.
- Test auth prompts for favourites/history.
- Verify dark mode still works without toggles.
- Check UI cleanliness after removals.
- Update copyright and logo display.
