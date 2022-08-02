  // const extractScript = /<script[^<]*<\/script>/gi.exec(html);
  const extractScript = /<script\b[^>]*>([\s\S]*?)<\/script>/gi.exec(html);
