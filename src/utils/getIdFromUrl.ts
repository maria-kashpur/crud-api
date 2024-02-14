export function getIdfromURL(segment: string, url?: string) {
  if (!url) return null;
  const segments = url.split("/");
  const segmentIndex = segments.indexOf(segment);
  if (segmentIndex !== -1 && segmentIndex + 1 < segments.length) {
    const id = segments[segmentIndex + 1];
    return id;
  } else {
    return null;
  }
}
