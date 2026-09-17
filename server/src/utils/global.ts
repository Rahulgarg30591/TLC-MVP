export const capitaliseStr = (str: string) => {
  let s = str.trim().split('');
  let ans = '';
  for(let i=0;i<s.length;i++)
  {
    if(i === 0 || s[i-1] === ' ')
    {
      s[i] = s[i].toUpperCase()
    }
    else
    {
      s[i] = s[i].toLowerCase()
    }
    ans+=s[i];
  }
  return ans
}

export const formatDate = (date: string) => {
  return new Date(date).toISOString()
}

/** Indian 10-digit mobile. Strips spaces, dashes, and a leading 91 / +91. */
export const normalizeMobile = (value?: string | null): string | null => {
  if (!value) return null;
  let digits = String(value).replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) {
    digits = digits.slice(2);
  }
  if (/^[6-9]\d{9}$/.test(digits)) return digits;
  return null;
};

export const enrollmentConstraintMessage = (message?: string): string => {
  const msg = message || '';
  if (msg.includes('enrollments_mobile_number_key')) {
    return 'Enrollment with this phone number already exists';
  }
  if (msg.includes('enrollments_email_key')) {
    return 'Enrollment with this email already exists';
  }
  if (msg.includes('Uniqueness violation')) {
    return 'Enrollment already exists';
  }
  return msg;
};