import { z } from 'zod';

export const PlanSchema = z.object({
  name: z.enum(['Starter', 'Pro', 'Expert']),
  price: z.string(),
  features: z.array(z.string()),
});

export const SubscriptionSchema = z.object({
  id: z.string(),
  plan: z.enum(['Starter', 'Pro', 'Expert']),
  status: z.enum(['Active', 'Cancelled', 'Inactive']),
  renewal_date: z.string().optional(), // Stored as ISO string
});

export const UserSchema = z.object({
  id: z.string(), // UUID from database
  name: z.string(),
  email: z.string().email(),
  plan: z.enum(['Starter', 'Pro', 'Expert']).optional().default('Starter'),
  status: z.enum(['Active', 'Cancelled']).optional().default('Active'),
  role: z.enum(['admin', 'user']).default('user'),
  subscription: SubscriptionSchema.optional(),
});

export type Plan = z.infer<typeof PlanSchema>;
export type Subscription = z.infer<typeof SubscriptionSchema>;
export type User = z.infer<typeof UserSchema>;
