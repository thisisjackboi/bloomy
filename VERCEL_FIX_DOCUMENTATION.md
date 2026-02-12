# Bloomy - Vercel Deployment Issue Fix

## Problem

On Vercel hosting, the "to name" (recipient) and "sender name" are not showing in the flower message card.

## ✅ Database Column Confirmed

The `letter` column in Supabase is correctly stored as **JSON** type (not TEXT).

## Root Cause Analysis

Since the database column type is correct, the issue is likely:

1. **Empty Fields**: Users might not be filling in sender/recipient fields when creating bouquets
2. **Old Data**: Existing bouquets might have been created before the letter feature was fully implemented
3. **Supabase Client Behavior**: Different JSON serialization between local and Vercel environments
4. **Data Structure**: The letter object might be getting stringified somewhere in the process

## Solution Implemented

### 1. Data Normalization in `/app/bouquet/[id]/page.tsx`

Added data normalization logic to handle cases where the `letter` field might be:

- A JSON string that needs parsing
- Null or undefined
- Already an object

```typescript
// Normalize the data to ensure letter is an object
const normalizedData = {
  ...data,
  letter:
    typeof data.letter === "string"
      ? JSON.parse(data.letter)
      : data.letter || { sender: "", recipient: "", message: "" },
};
```

### 2. Data Normalization in `/app/garden/page.tsx`

Applied the same normalization to all bouquets in the garden view:

```typescript
// Normalize the data to ensure letter is an object for all bouquets
const normalizedBouquets = data.map((bouquet) => ({
  ...bouquet,
  letter:
    typeof bouquet.letter === "string"
      ? JSON.parse(bouquet.letter)
      : bouquet.letter || { sender: "", recipient: "", message: "" },
}));
```

### 3. Debug Logging

Added console logging to help identify the exact data structure:

- Logs the raw data from Supabase
- Logs the type of the letter field
- Logs the normalized data
- Logs data being sent when creating bouquets

## Debugging Steps

### Step 1: Test Locally with Database Inspector

Visit `http://localhost:3000/test-db` to see:

- The actual data structure in your database
- Whether `letter` is an object or string
- The actual values of sender, recipient, and message

### Step 2: Create a Test Bouquet Locally

1. Go to `http://localhost:3000/bouquet?mode=color`
2. **Fill in ALL fields** including sender and recipient names
3. Check browser console (F12) to see what data is being sent to Supabase
4. After creation, check console logs on the bouquet page

### Step 3: Check Existing Data in Supabase

Run this query in Supabase SQL Editor to see actual data:

```sql
SELECT id, letter, created_at
FROM bouquets
ORDER BY created_at DESC
LIMIT 5;
```

Look for:

- Are `sender` and `recipient` fields empty strings?
- Is the `letter` field properly structured as JSON?

### Step 4: Deploy and Test on Vercel

```bash
git add .
git commit -m "Add data normalization and debugging for letter field"
git push
```

Then:

1. Wait for Vercel to rebuild
2. Create a new bouquet on Vercel (fill in ALL fields!)
3. Check if sender/recipient names appear
4. Check browser console for debug logs

## Files Modified

1. `app/bouquet/[id]/page.tsx` - Data normalization + debug logging
2. `app/garden/page.tsx` - Data normalization for all bouquets
3. `app/bouquet/stages/ShareBouquet.tsx` - Debug logging when creating bouquets
4. `app/test-db/page.tsx` - New test page to inspect database (NEW FILE)

## Fallback Behavior

If sender or recipient are still empty after normalization, the UI will show:

- **Recipient**: "Friend" (fallback in Bouquet.tsx line 106)
- **Sender**: "Someone Special" (fallback in Bouquet.tsx line 112)

## Cleanup After Fix

Once the issue is resolved, remove:

- Console.log statements from `/app/bouquet/[id]/page.tsx`
- Console.log statements from `/app/bouquet/stages/ShareBouquet.tsx`
- The test page `/app/test-db/page.tsx`

## Additional Notes

- The normalization is backward compatible and won't break existing functionality
- The fallback values ensure the UI never shows empty fields
- Debug logs will help identify if the issue is with data storage or retrieval
