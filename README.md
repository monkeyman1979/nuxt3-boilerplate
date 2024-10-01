# Nuxt 3 Boilerplate

This is a Nuxt 3 boilerplate project with Tailwind CSS, shadcn-vue, Supabase, Stripe, Pinia, and VueUse integration. It features a unified authentication screen offering both passkey and magic link options.

## Features

- [Nuxt 3](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn-vue](https://github.com/radix-vue/shadcn-vue)
- [Supabase](https://supabase.io/)
- [Stripe](https://stripe.com/)
- [Pinia](https://pinia.vuejs.org/)
- [VueUse](https://vueuse.org/)
- Unified Authentication (Passkey and Magic Link)

## Prerequisites

- Node.js (v14.16 or later)
- npm

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/monkeyman1979/nuxt3-boilerplate.git
   cd nuxt3-boilerplate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

   Open the `.env` file and update the following variables with your actual credentials:

   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Development Server**

   Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

5. **Build for Production**

   To build the application for production:

   ```bash
   npm run build
   ```

## Authentication

This boilerplate implements a unified authentication system that combines both passkey and magic link methods on a single login screen. This approach provides users with a seamless and flexible authentication experience.

Key features of the authentication system:

1. **Passkey Authentication**: 
   - Allows users to sign up and sign in using passkeys.
   - Provides a secure, passwordless authentication experience.
   - Leverages the Web Authentication API for enhanced security.

2. **Magic Link Authentication**:
   - Enables users to sign up or sign in by receiving a secure link via email.
   - Offers a convenient alternative for users who prefer email-based authentication.

3. **Unified Interface**:
   - Presents both authentication options on a single screen.
   - Allows users to choose their preferred method at the point of login.

To implement this authentication system:

1. Configure Supabase Authentication in your project dashboard.
2. Enable both Passkey and Magic Link authentication methods in the Supabase Auth settings.
3. Create a unified login component in your Nuxt application.
4. Use the Supabase Vue library to handle authentication logic.
5. Implement proper error handling and user feedback for both authentication methods.

For detailed implementation instructions and best practices, refer to the Supabase documentation on [Passkey authentication](https://supabase.com/docs/guides/auth/passwordless-login/auth-passkeys) and [Magic Link authentication](https://supabase.com/docs/guides/auth/passwordless-login/auth-magic-link).

## Project Structure

```
├── .nuxt/                 # Build directory (auto-generated)
├── assets/                # Uncompiled assets
│   └── css/
│       └── tailwind.css   # Tailwind CSS entry point
├── components/            # Vue components
│   └── ui/                # shadcn-vue components
├── composables/           # Composable functions
├── layouts/               # Layout components
├── pages/                 # Route components
├── plugins/               # Nuxt plugins
├── public/                # Static files
├── server/                # Server-side code
│   ├── api/               # API routes
│   └── middleware/        # Server middleware
├── stores/                # Pinia stores
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── app.vue                # Main app component
├── nuxt.config.ts         # Nuxt configuration
├── package.json           # Project dependencies and scripts
├── README.md              # Project documentation
└── tailwind.config.js     # Tailwind CSS configuration
```

## Customization

- **Tailwind CSS**: Customize the `tailwind.config.js` file to modify your project's design system.
- **shadcn-vue**: Add or modify components in the `components/ui/` directory.
- **Pinia Stores**: Create new stores in the `stores/` directory.
- **API Routes**: Add serverless API routes in the `server/api/` directory.
- **Layouts**: Create custom layouts in the `layouts/` directory.

## Best Practices

- Utilize Tailwind CSS for styling components, including the authentication screen.
- Leverage VueUse composables for common functionalities.
- Use Pinia for state management across components, including managing authentication state.
- Implement Supabase for backend functionalities and user authentication.
- Use Stripe for payment processing (ensure PCI compliance when handling payment information).
- Follow Vue 3 Composition API best practices in your components and composables.
- Implement proper error handling and user feedback for authentication processes.
- Ensure the unified authentication UI is intuitive, accessible, and responsive.
- Provide clear instructions for users on how to use both passkey and magic link options.
- Implement appropriate security measures, such as rate limiting, to prevent abuse of the authentication system.
- Regularly update dependencies and follow security best practices for authentication implementation.

## Contributing

[Include instructions for how others can contribute to your project]

## License

MIT License

Copyright (c) 2024 Nuxt Boilerplate

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


---

Happy coding! 🚀