# Nuxt 3 Boilerplate

This is a Nuxt 3 boilerplate project with Tailwind CSS, shadcn-vue, Supabase, Stripe, Pinia, and VueUse integration.

## Features

- [Nuxt 3](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn-vue](https://github.com/radix-vue/shadcn-vue)
- [Supabase](https://supabase.io/)
- [Stripe](https://stripe.com/)
- [Pinia](https://pinia.vuejs.org/)
- [VueUse](https://vueuse.org/)

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

3. ## Environment Setup

This project uses environment variables for configuration. Follow these steps to set up your environment:

Copy the `.env.example` file to create your own `.env` file:

   ```bash
   cp .env.example .env
   ```

Open the `.env` file and replace the placeholder values with your actual configuration:

   ```
   SUPABASE_URL=your_actual_supabase_url
   SUPABASE_KEY=your_actual_supabase_key
   STRIPE_PUBLISHABLE_KEY=your_actual_stripe_key
   ```

Make sure not to commit your `.env` file to version control. It's already included in `.gitignore` for your safety.

Note: The `.env` file contains sensitive information. Never share or commit this file to your repository.

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

- Utilize Tailwind CSS for styling components.
- Leverage VueUse composables for common functionalities.
- Use Pinia for state management across components.
- Implement Supabase for backend functionalities and user authentication.
- Use Stripe for payment processing (ensure PCI compliance when handling payment information).
- Follow Vue 3 Composition API best practices in your components and composables.


## License

MIT License

Copyright (c) 2024 Nuxt Boilerplate

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


---

Happy coding! 🚀