'use client'

import { KumaRegistry } from '@kuma-ui/next-plugin/registry'

export function Providers({ children }: { children: React.ReactNode }) {
	return <KumaRegistry>{children}</KumaRegistry>
}
