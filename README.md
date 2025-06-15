This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### **How I approached solving the problem?**

I approached the problem by carefully analyzing the  requirements and breaking the solution into several key components:

1. **Dynamic and Responsive Landing Page**:  
   - Developed the landing page to adapt to different screen sizes, ensuring usability on both desktop and mobile devices.

2. **Abstraction and Reusability**:  
   - Abstracted the API call logic into a **custom React hook**, making it reusable and easier to maintain.

   - Centralized screen text content into a dedicated file, improving reusability, consistency, and ease of maintenance.

   - Created a central styling system to keep uniformity in styling and for maintanability.

3. **Verification Through Testing**:  
   - Validated the solution by writing comprehensive **unit tests** and performing manual testing across multiple browsers.

   - Instead of mocking the hook directly, I used **MSW** to mock the API calls for more realistic and maintainable test cases. This approach provided a closer simulation of real-world scenarios

To align with **Manual  front-end technologies**, I utilized:
- **TypeScript** for type safety and improved developer experience.
- **Next JS (as the description prefers)**: I chose **Next.js**, as recommended on the official [React website](https://react.dev/learn/start-a-new-react-project), for its server-side rendering (SSR) and static site generation (SSG) capabilities.
- **React Testing Library** for testing React components effectively.
- **SASS** for modular and maintainable styling (done in alphabetical order for easy read).

---

### **How I verified my solution works correctly?**

- **Manual Testing**:  
  I manually tested the application on all major browsers to ensure consistent behavior and responsiveness.

- **Unit Testing**:  
  I used **Jest** and **React Testing Library** to cover the critical functionalities of the application, rendering of hero, and quiz functionality.

---

### **Time Spent**

I spent approximately **6.5 hours** on this exercise.

---

### **What I would add if I had more time and how?**

1. **End-to-End Testing with Cypress**:  
   - Introduce **Cypress** for end-to-end testing to ensure the full workflow functions correctly from the user’s perspective, including navigation, search, and API integration.

2 **Image Optimisation**:
    - optimise the images across the webpage to reduce LCP

3. **Improved Mobile Accessibility**:  
   - For a better mobile experience:

4. **Internationalization (i18n)**:  
   - Implemented internationalization for text content to support multiple languages, ensuring accessibility and usability for a diverse audience.

Desktop Lighthouse Audit:

![Screenshot 2025-06-15 at 02 25 58 (2)](https://github.com/user-attachments/assets/91e806cd-9ca6-4992-83ea-3f2e0afbcd25)




