# Cookiebot + GTM Setup Guide

## Current Setup ✅

Your current setup is correct:

- Cookiebot is integrated via GTM tag
- GTM is properly configured in `app/layout.tsx`
- DNS prefetch includes `consent.cookiebot.eu`

## The Real Issue: YouTube Embeds

The third-party cookie warnings you're seeing are likely from:

1. **YouTube embeds** using `www.youtube.com` (sets cookies)
2. **Google Ads/DoubleClick** (loaded through GTM)

## Solution: Use Privacy-Enhanced YouTube Component

Replace any YouTube embeds with the privacy-enhanced component:

```tsx
import PrivacyEnhancedYouTube from "components/PrivacyEnhancedYouTube";

// Instead of regular iframe
<PrivacyEnhancedYouTube
  videoId="jzLp_-6PJCE"
  title="Your Video Title"
  width={560}
  height={315}
/>;
```

## GTM Configuration for Cookiebot

Make sure your GTM tags are configured with Cookiebot triggers:

### 1. Tag Configuration

- **Tag Type**: Custom HTML
- **HTML**: Your Cookiebot script
- **Trigger**: All Pages
- **Advanced Settings**:
  - Tag firing options: Once per page
  - Tag firing priority: 1 (highest priority)

### 2. Cookiebot Script in GTM

```html
<script
  id="Cookiebot"
  src="https://consent.cookiebot.eu/uc.js"
  data-cbid="YOUR_COOKIEBOT_ID"
  data-blockingmode="auto"
></script>
```

### 3. Other Tags Configuration

For tags that set cookies (Google Analytics, Google Ads, etc.):

- **Trigger**: Custom Event
- **Event Name**: `CookiebotOnConsentReady`
- **Additional Conditions**:
  - Marketing cookies: `{{Cookiebot Consent Marketing}}` equals `true`
  - Statistics cookies: `{{Cookiebot Consent Statistics}}` equals `true`

## Testing Your Setup

### 1. Test Third-Party Cookie Blocking

1. Open Chrome DevTools
2. Go to Privacy and Security panel
3. Enable "Temporarily limit third-party cookies"
4. Reload your site
5. Check if YouTube videos still work

### 2. Verify Cookiebot Integration

1. Open DevTools Console
2. Type: `window.Cookiebot`
3. Check if Cookiebot object exists
4. Check consent status: `window.Cookiebot.consent`

### 3. Check GTM DataLayer

1. Open DevTools Console
2. Type: `window.dataLayer`
3. Look for consent-related events

## Expected Results

After implementing the privacy-enhanced YouTube component:

- ✅ Reduced third-party cookie warnings
- ✅ YouTube videos use `youtube-nocookie.com`
- ✅ Only loads iframe after user interaction
- ✅ Works with existing Cookiebot setup

## No Changes Needed to Your Current Setup

Your current GTM + Cookiebot integration is correct. The main fix is replacing YouTube embeds with the privacy-enhanced component.
