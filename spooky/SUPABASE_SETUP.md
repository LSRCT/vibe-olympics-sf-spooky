# 🔐 Supabase Authentication Setup

The app is already configured to use Supabase authentication! Here's what's set up:

## ✅ What's Already Done

1. **Supabase Client** (`src/lib/supabase.ts`):
   - Configured with your credentials from `.env`
   - Ready to use throughout the app

2. **Auth Component** (`src/components/Auth.tsx`):
   - Sign up with email/password
   - Sign in with email/password
   - Guest mode (skip authentication)
   - Error handling and loading states

3. **App Integration** (`src/App.tsx`):
   - Session management
   - Automatic redirect after login
   - Logout functionality
   - User info display in header
   - Guest mode support

## 🎯 How Authentication Works

### User Flow
1. **First Visit**: User sees Auth screen
2. **Sign Up**: User creates account with email/password
3. **Email Verification**: Supabase sends confirmation email
4. **Sign In**: User logs in with verified credentials
5. **Session**: User stays logged in (persists across refreshes)
6. **Logout**: User can sign out anytime

### Guest Mode
Users can skip authentication and use the app as a guest by clicking "Continue as guest" on the auth screen.

## 🔧 Supabase Dashboard Configuration

### Email Auth Settings (Already Configured)

Your Supabase project should have these settings enabled:

1. Go to: **Authentication → Providers → Email**
2. Ensure these are enabled:
   - ✅ Enable Email provider
   - ✅ Confirm email (recommended for production)

### Email Templates (Optional Customization)

You can customize the verification emails:

1. Go to: **Authentication → Email Templates**
2. Customize:
   - Confirm signup
   - Magic link
   - Password recovery

### Site URL Configuration

For production deployment:

1. Go to: **Authentication → URL Configuration**
2. Set **Site URL**: `https://your-vercel-url.vercel.app`
3. Add **Redirect URLs**:
   - `https://your-vercel-url.vercel.app`
   - `http://localhost:5173` (for development)
   - `http://localhost:5174` (backup dev port)

## 🧪 Testing Authentication

### Test Locally

1. Start the dev server:
```bash
npm run dev
```

2. Visit `http://localhost:5174`

3. Test signup:
   - Enter email (use a real email to test verification)
   - Enter password (min 6 characters)
   - Click "Create Account"
   - Check email for verification link

4. Test login:
   - Use verified credentials
   - Should redirect to landing page
   - See email in top-right corner

5. Test guest mode:
   - Click "Continue as guest"
   - Should access app without login
   - Header shows "Guest Mode"

6. Test logout:
   - Click "Logout" in header
   - Should return to auth screen

### Test Users

For quick testing, you can create test users directly in Supabase:

1. Go to: **Authentication → Users**
2. Click "Add user"
3. Enter test email and password
4. User can now log in immediately (no verification needed)

## 🚨 Common Issues

### Issue: "Invalid email or password"
- **Cause**: Email not verified or wrong credentials
- **Fix**: Check Supabase users table or use test user

### Issue: "User already registered"
- **Cause**: Email already exists
- **Fix**: Use sign in instead, or reset password

### Issue: "Missing Supabase environment variables"
- **Cause**: `.env` file not found or variables not prefixed with `VITE_`
- **Fix**: Ensure `.env` exists in `spooky/` directory with correct format

### Issue: Auth not persisting after refresh
- **Cause**: Supabase session storage issue
- **Fix**: Clear browser storage and try again

## 📊 Monitoring Users

View all users in Supabase Dashboard:

1. Go to: **Authentication → Users**
2. See:
   - All registered users
   - Email verification status
   - Last sign in time
   - User metadata

## 🔒 Security Notes

### Current Setup (Development)
- Email/password authentication
- Email verification (configurable)
- Session management via Supabase
- Anonymous key is safe for client-side (read-only access)

### Production Recommendations
1. **Enable Email Verification**: Prevent fake signups
2. **Rate Limiting**: Configure in Supabase to prevent abuse
3. **Row Level Security (RLS)**: When you add database tables, enable RLS
4. **HTTPS Only**: Vercel provides this automatically
5. **Environment Variables**: Use Vercel's env vars, not committed `.env`

## 🎨 Customization Ideas

### Add Social Auth
Supabase supports:
- Google
- GitHub
- Discord
- Many more!

Enable in: **Authentication → Providers**

### Password Reset
Add password reset flow:
```typescript
await supabase.auth.resetPasswordForEmail(email);
```

### Magic Links
Use passwordless login:
```typescript
await supabase.auth.signInWithOtp({ email });
```

## 📝 Next Steps

Now that auth is working, you can:

1. **Add Persistence** (1 pt):
   - Create `tours` table in Supabase
   - Save tours with `user_id` foreign key
   - Fetch user's saved tours

2. **User Profile**:
   - Create profile page
   - Show user's tour history
   - Allow profile updates

3. **Protected Routes**:
   - Require login for certain features
   - Show different UI for logged-in users

---

**Current Score: 4/10 points** 🎉

Authentication is complete and working! Ready to add more features.
