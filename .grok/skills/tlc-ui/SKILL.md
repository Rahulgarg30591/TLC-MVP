---
name: tlc-ui
description: >
  Change TLC-MVP layout, pages, lists, or forms, including phone layout.
  Use when the user mentions the sidebar, a page, a table, a form, responsive
  layout, mobile, or runs /tlc-ui.
---

# TLC UI

Brand tokens live only in `client/src/Theme.js`. Routes live in `README.md`. The local login for a browser check lives in the `tlc-mvp` skill. API wiring lives in the `tlc-change` skill.

## Shell today

- `client/src/Components/Wrapper/Wrapper.jsx` renders a fixed `Navbar` and `Sidebar` when someone is logged in.
- At `md` and up the sidebar stays open. Below `md` it is a temporary drawer opened from the navbar.
- The main column is full width only below `md`.
- Lists render through `client/src/Components/Table/Table.jsx` (AG Grid).
- People who log in are admins and volunteers. Both roles use the same phone-first forms. An enrollment is a participant record, not an account.
- On signup, profile, and volunteer detail, phone is required personal information. Email is an optional field under Extra information, for both volunteers and admins. The login field is the phone number. An email still signs in when the account has one. The invite dialog still needs an email because that is where the invite link is sent.

## Phone is the primary layout

`md` and up is the wide layout. Below `md`:

- Dashboard, Volunteers, Workshops, Meetings, and Enrollments sit in a bottom nav, using the sidebar icons. Opening Enrollments must not require the drawer.
- Each list is cards. A card shows the name and one secondary line (phone or date). A tap opens the existing detail route. Search stays above the list. Filters open in one sheet.
- AG Grid, including bulk row select, stays at `md` and up.
- Forms are one column. The primary button sticks to the bottom of the screen. Text inputs are at least 16px.
- Below `sm`, delete, invite, add-child, and volunteer-autocomplete dialogs are full-screen sheets.
- Size the shell with `100dvh` and safe-area insets.

When implementing this, do the shell first, then the enrollment list and enrollment form, then the other lists, then the dashboard and the remaining forms. A task that names one screen does only that screen, and still follows the rules above.

## Check

In the browser, at a phone width and at `md` and up, use the screen you changed, then open every route that shares that shell or list. Sign in with the local admin from `tlc-mvp`.

Stay in this React app. Do not add React Native, Capacitor, or another date library. Do not add a service worker unless the task is home-screen install.
