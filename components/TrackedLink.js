'use client';
import { track } from '../lib/track';

export default function TrackedLink({ event, params, children, ...props }) {
  return (
    <a {...props} onClick={() => event && track(event, params)}>
      {children}
    </a>
  );
}
