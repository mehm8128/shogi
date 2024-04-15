'use client'

import { KumaRegistry } from '@kuma-ui/next-plugin/registry'
import { Provider } from 'jotai'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<KumaRegistry>
			<Provider>{children}</Provider>
		</KumaRegistry>
	)
}
