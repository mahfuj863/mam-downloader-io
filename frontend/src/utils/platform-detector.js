export const platformPatterns = {
  youtube: {
    regex: /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]+)/,
    name: 'YouTube',
    icon: 'youtube',
    color: '#FF0000',
  },
  instagram: {
    regex: /instagram\.com\/(?:p|reel)\/([\w-]+)/,
    name: 'Instagram',
    icon: 'instagram',
    color: '#E4405F',
  },
  tiktok: {
    regex: /(?:tiktok\.com\/.*v=|vm\.tiktok\.com\/)(\w+)/,
    name: 'TikTok',
    icon: 'music',
    color: '#000000',
  },
  facebook: {
    regex: /facebook\.com\/(?:watch\/\?v=|.*\/videos\/)(\d+)/,
    name: 'Facebook',
    icon: 'facebook',
    color: '#1877F2',
  },
  reddit: {
    regex: /reddit\.com\/r\/\w+\/comments\/(\w+)/,
    name: 'Reddit',
    icon: 'reddit',
    color: '#FF4500',
  },
  pinterest: {
    regex: /pinterest\.com\/pin\/(\d+)/,
    name: 'Pinterest',
    icon: 'pin',
    color: '#E60023',
  },
  threads: {
    regex: /threads\.net\/.*\/(\w+)/,
    name: 'Threads',
    icon: 'message-circle',
    color: '#000000',
  },
}

export const detectPlatform = (url) => {
  try {
    new URL(url)
  } catch {
    return null
  }

  for (const [key, platform] of Object.entries(platformPatterns)) {
    if (platform.regex.test(url)) {
      return {
        platform: key,
        name: platform.name,
        icon: platform.icon,
        color: platform.color,
      }
    }
  }

  return null
}

export const isValidUrl = (url) => {
  try {
    new URL(url)
    return detectPlatform(url) !== null
  } catch {
    return false
  }
}
