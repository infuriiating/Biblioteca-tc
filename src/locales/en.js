export default {
  sidebar: {
    discover: 'Discover',
    myLibrary: 'My Library',
    overview: 'Overview',
    books: 'Books',
    categories: 'Categories',
    loans: 'Loans',
    users: 'Users',
    administration: 'Administration',
    settings: 'Settings',
    admin: 'Admin',
    feedback: 'Feedback',
    wishlist: 'Wishlist',
    activity: 'Activity'
  },
  wishlist: {
    title: 'Wishlist',
    subtitle: 'Books you saved for later',
    empty: 'No books in your wishlist yet.',
    toggle: 'Add to wishlist',
    added: 'Added to wishlist',
    removed: 'Removed from wishlist',
    error: 'Could not update wishlist'
  },
  aiChat: {
    open: 'Book assistant',
    title: 'BibliotecaTC Assistant',
    welcome: 'Describe a topic, subject, or author — I will suggest matching books from our catalog.',
    placeholder: 'e.g. recommend a philosophy book...',
    thinking: 'Thinking...',
    viewBook: 'View book in catalog',
    error: 'Could not get a response. Try again.',
    noApiKey: 'The assistant is not available right now.',
    loginRequired: 'Sign in to use the assistant.'
  },
  navbar: {
    searchPlaceholder: 'Search books, authors...',
    myAccount: 'My Account',
    myLoans: 'My Loans',
    manageBooks: 'Manage Books',
    manageLoans: 'Loans',
    newBook: 'New Book',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
    adminMenu: 'Administration',
    docs: 'Documentation',
    notifications: 'Notifications',
    loading: 'Loading...',
    all: 'All',
    home: 'Home',
    settings: 'Settings'
  },
  landing: {
    badge: 'Digital Library',
    title: 'Tomás Cabreira Secondary School',
    subtitle: 'Welcome to our library\'s digital portal. Explore our vast catalog of books, theses, and educational resources.',
    exploreBtn: 'Explore Catalog',
    ctaTitle: 'Ready to borrow a book?',
    ctaDesc: 'Create your account now and explore the library\'s digital catalog.',
    aboutTitle: 'About our Library',
    aboutDesc: 'The Tomás Cabreira Secondary School Library is a space for learning, discovery, and sharing. Now, with our digital version, you can check book availability and manage your requests from anywhere.',
    features: {
      search: 'Smart Search',
      searchDesc: 'Easily find what you are looking for by title, author, or category.',
      manage: 'Online Management',
      manageDesc: 'Track your loans and receive return notifications.',
      access: 'Easy Access',
      accessDesc: 'Available on any device for the entire school community.'
    }
  },
  settings: {
    title: 'Settings',
    subtitle: 'Manage your account and preferences',
    profile: 'Profile',
    name: 'Name',
    email: 'Email',
    appearance: 'Appearance',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    languageSection: 'Language',
    languageDesc: 'Choose your preferred language',
    administration: 'Administration',
    adminActive: 'Admin Session Active',
    adminDesc: 'You are logged in as administrator',
    adminLogout: 'Admin Logout',
    account: 'Account',
    signOutTitle: 'Sign out',
    signOutDesc: 'You\'ll be redirected to the login page',
    logoutBtn: 'Logout',
    feedback: {
      title: 'Send Feedback',
      question: 'Issues or Suggestions?',
      questionDesc: 'Help us improve the platform by describing your experience.',
      writeBtn: 'Write',
      viewTitle: 'View Received Feedback',
      viewDesc: 'Review suggestions and issues reported by users.',
      viewBtn: 'View Feedback',
      placeholder: 'Describe the issue you found or your improvement suggestion...',
      cancelBtn: 'Cancel',
      sendBtn: 'Send Feedback',
      errorToast: 'Error sending feedback',
      successToast: 'Thank you for your feedback!'
    },
    newsletter: {
      title: 'Newsletter — fun facts',
      desc: 'Get book, history, philosophy and world facts at 8:20 on weekdays.',
      enabled: 'Receive newsletter',
      weeklyPicks: 'Receive weekly book picks',
      categories: 'Categories',
      catBooks: 'Books',
      catHistory: 'History',
      catPhilosophy: 'Philosophy',
      catWorld: 'World',
      save: 'Save preferences',
      saved: 'Preferences saved'
    },
  },
  routes: {
    login: '/login',
    signup: '/signup',
    adminLogin: '/console/login',
    book: '/book/:id',
    myLoans: '/my-loans',
    settings: '/settings',
    notifications: '/notifications',
    adminBooks: '/console/books',
    adminCategories: '/console/categories',
    adminLoans: '/console/loans',
    adminBooksNew: '/console/books/new',
    adminBooksEdit: '/console/books/edit/:id'
  },
  admin: {
    dashboard: {
      totalBooks: 'TOTAL BOOKS',
      activeLoans: 'ACTIVE LOANS',
      pendingRequests: 'PENDING REQUESTS',
      overdue: 'OVERDUE',
      recentActivity: 'Recent Loan Activity',
      viewAll: 'View All',
      quickActions: 'Quick Actions',
      addNewBook: 'Add New Book',
      updateCatalog: 'UPDATE CATALOG',
      manageBooks: 'Manage Books',
      editOrRemove: 'EDIT OR REMOVE',
      manageLoans: 'Manage Loans',
      approveReject: 'APPROVE / REJECT'
    },
    activity: {
      title: 'Activity log',
      subtitle: 'Recent platform actions',
      when: 'When',
      user: 'User',
      action: 'Action',
      details: 'Details',
      empty: 'No records.'
    },
    reports: {
      exportPdf: 'Export PDF report',
      popupBlocked: 'Allow pop-ups to export the report.'
    },
    login: {
      title: 'Admin Console',
      subtitle: 'Restricted access portal for library management',
      backToLibrary: 'Back to Library',
      authorize: 'Authorize',
      secureDb: 'Secure Database Authentication',
      accessDenied: 'Access denied. Administrators only.'
    },
    common: {
      approve: 'Approve',
      reject: 'Reject',
      rejectBtn: 'Reject',
      returnBtn: 'Return',
      loadingRequests: 'Loading requests...',
      fetchingCollection: 'Fetching your collection...',
      noRequests: 'No loan requests found',
      noBooks: 'No books found in this search',
      saveOrder: 'Save Order',
      orderSaved: 'Order saved successfully!',
      orderError: 'Error saving order.',
      select: {
        placeholder: 'Select an option...',
        noOptions: 'No options'
      }
    },
    books: {
      searchPlaceholder: 'Search by title, author or ISBN...',
      allCategories: 'All Categories',
      id: 'ID',
      bookInfo: 'BOOK INFO',
      inventory: 'INVENTORY',
      featured: 'FEATURED',
      actions: 'ACTIONS',
      available: 'AVAILABLE',
      outOfStock: 'OUT OF STOCK',
      noCover: 'NO COVER',
      filterPlaceholder: 'Select genre...',
      toastSaved: 'Book updated successfully!',
      toastAdded: 'Book added successfully!',
      toastDeleted: 'Book deleted successfully.',
      toastDeleteError: 'Error deleting book.',
      deleteTitle: 'Delete Book',
      deleteMsg: 'Are you sure you want to permanently delete this book from the catalog?',
      deleteBtn: 'Delete'
    },
    categories: {
      title: 'Categories',
      subtitle: 'Manage the book catalog categories.',
      addPlaceholder: 'New category name...',
      searchPlaceholder: 'Search categories...',
      addBtn: 'Add',
      dragToReorder: 'Drag icons to reorder',
      deleteTitle: 'Delete Category',
      deleteMsg: 'Are you sure you want to delete this category? This may affect associated books.',
      deleteBtn: 'Yes, Delete'
    },
    loans: {
      title: 'Loan Management',
      subtitle: 'Manage and track reader borrows',
      searchPlaceholder: 'Search by book, author or user email...',
      all: 'ALL',
      pending: 'PENDING',
      active: 'ACTIVE',
      returned: 'RETURNED',
      rejected: 'REJECTED',
      overdue: 'OVERDUE',
      id: 'ID',
      user: 'USER',
      bookDetails: 'BOOK DETAILS',
      status: 'STATUS',
      actions: 'ACTIONS',
      libMember: 'LIB MEMBER',
      borrowedDate: 'BORROWED',
      returnedDate: 'RETURNED ON',
      dueDate: 'DUE DATE',
      approvedDate: 'APPROVED ON'
    },
    feedback: {
      title: 'User Feedback',
      subtitle: 'Suggestions and issues reported by the community',
      user: 'USER',
      message: 'MESSAGE',
      date: 'DATE',
      noFeedback: 'No feedback received yet.'
    },
    users: {
      title: 'Users',
      subtitle: 'Manage system access and roles',
      searchPlaceholder: 'Search name or email...',
      nameDetails: 'USER DETAILS',
      role: 'ROLE',
      joined: 'JOINED',
      updateSuccess: 'Role updated successfully',
      updateError: 'Error updating role',
      noUsers: 'No users found'
    },
    roles: {
      admin: 'Administrator',
      professor: 'Professor',
      aluno: 'Student',
      student: 'Student',
      membro: 'Member'
    },
    editBook: {
      newBookTitle: 'Add New Book',
      editBookTitle: 'Edit Book Details',
      newBookSubtitle: 'Add a new book to the library catalog',
      editBookSubtitle: 'Update the information for this book',
      fullTitle: 'FULL TITLE',
      authorName: 'AUTHOR NAME',
      isbnReference: 'ISBN REFERENCE',
      primaryCategory: 'PRIMARY CATEGORY',
      publisher: 'PUBLISHER',
      inventoryQuantity: 'INVENTORY QUANTITY',
      guidelines: 'GUIDELINES',
      guideline1: 'Higher resolution images are preferred',
      guideline2: 'Recommended aspect ratio: 3:4',
      guideline3: 'Max file size: 5MB (JPG, PNG)',
      addBookBtn: 'ADD BOOK',
      updateBookBtn: 'UPDATE BOOK',
      uploadImage: 'Click to upload or drag and drop',
      imageFormats: 'SVG, PNG, JPG or GIF (max. 800x400px)',
      titlePlaceholder: 'The Great Gatsby',
      authorPlaceholder: 'F. Scott Fitzgerald',
      isbnPlaceholder: '978-0-...',
      publisherPlaceholder: "Charles Scribner's Sons"
    }
  },
  bookDetails: {
    backToCatalog: 'Back to catalog',
    backToStart: 'Back to start',
    bookNotFound: 'Book not found',
    requestedSuccess: 'Successfully requested',
    requestBook: 'Request Book',
    outOfStock: 'Out of stock',
    availableOf: '{available} of {total} available',
    aboutBook: 'About this book',
    aiSummary: 'AI',
    generateAiSummary: 'Generate AI summary',
    generatingAiSummary: 'Generating summary...',
    noDescription: 'No description available for this book. Use the button below to generate an AI summary.',
    noDescriptionGuest: 'No description available. Sign in to generate an AI summary.',
    generateSummaryLogin: 'Sign in to generate summary',
    bookMetadata: 'Book Details',
    isbn: 'ISBN',
    publisher: 'Publisher',
    yearEdition: 'Publish Year',
    reviewsTitle: 'Reviews & Comments',
    writeReview: 'Write a Review',
    editReview: 'Edit your Review',
    submitReview: 'Submit Review',
    cancelReview: 'Cancel',
    noReviews: 'No reviews yet. Be the first to review this book!',
    ratingLabel: 'Rating',
    commentLabel: 'Comment (optional)',
    averageRating: 'Average Rating',
    reviewSuccess: 'Review submitted successfully!',
    reviewError: 'Failed to submit review. Please try again.',
    youReviewed: 'You reviewed this book',
    catalog: 'Catalog',
    availability: 'Availability',
    availableForRequest: 'Available for request',
    alreadyRequested: 'Already Requested',
    waitingApproval: 'Waiting for administrator approval',
    review: 'review',
    reviews: 'reviews',
    deleteReviewTitle: 'Delete Review',
    deleteReviewConfirm: 'Are you sure you want to delete this review?',
    deleteReviewSuccess: 'Review deleted successfully.',
    deleteReviewError: 'Error deleting review.',
    anonymousUser: 'User',
    requestError: 'Error requesting book',
    processError: 'Error processing your request.',
    featuredError: 'Error updating featured status',
    featuredAdded: 'Book featured successfully ⭐',
    featuredRemoved: 'Featured status removed',
    emailSubject: 'Reservation Registered',
    emailMessage: 'Your request to reserve the book "{title}" was received and is awaiting approval. You will have 12 hours to pick up the book at the physical library before the reservation automatically expires.',
    emailButtonText: 'View my loans'
  },
  docs: {
    badge: 'Official Documentation',
    title: 'Library Documentation',
    subtitle: 'Everything you need to know to use the Digital Library efficiently.',
    borrow: {
      title: '1. How to Borrow a Book',
      desc: 'Browse the catalog, choose a book, and click "Request Book". After the request, you have a 12-hour window to pick up the book at the physical library before the reservation is automatically cancelled.',
    },
    pin: {
      title: '2. Return PIN (4 Digits)',
      desc: 'Upon pickup, a unique 4-digit code is associated with your request. You can find this PIN in the "My Loans" menu. You must provide it to the administrator to complete the return.',
    },
    duration: {
      title: '3. Borrow Duration',
      desc: 'The standard loan period for any book in our catalog is 15 days. You will be notified one day before the deadline via email and in-app notifications.',
    },
    ai: {
      title: '4. AI Descriptions',
      desc: 'Our platform uses Artificial Intelligence to read book metadata and generate automatic descriptions and engaging summaries, helping you decide if the book is what you are looking for.',
    },
    fine: {
      title: '5. Overdue Fine',
      desc: 'To ensure catalog rotation, returns made after the deadline are subject to a single fine of 5.00€.',
    },
    feedback: {
      title: '6. Feedback and Support',
      desc: 'If you encounter any error on the site, have doubts about how it works, or want to suggest improvements, use the "Send Feedback" button in your Settings.',
    },
    privacy: {
        title: 'Privacy Policy',
        content: `
          <h3>1. Data Controller</h3>
          <p>Agrupamento de Escolas Tomás Cabreira, located in Faro, Portugal, is the controller responsible for the personal data collected through this digital library platform.</p>

          <h3>2. Data We Collect</h3>
          <p>We collect only the data strictly necessary to provide the service:</p>
          <ul>
            <li>Full name and email address (for identification and communication);</li>
            <li>Loan and return history (for loan management);</li>
            <li>Technical access data such as IP address and browser type (for security and diagnostics).</li>
          </ul>

          <h3>3. Purpose of Processing</h3>
          <p>The data collected is used exclusively to:</p>
          <ul>
            <li>Manage accounts and authenticate users;</li>
            <li>Process and track loan requests;</li>
            <li>Send notifications related to your account (approvals, deadlines, returns);</li>
            <li>Continuously improve our services.</li>
          </ul>

          <h3>4. Data Sharing</h3>
          <p>Your personal data is not sold, rented, or shared with third parties for commercial purposes. It may only be shared with competent authorities when required by law or court order.</p>

          <h3>5. Security</h3>
          <p>We implement appropriate technical and organisational measures to protect your data against unauthorised access, loss, or destruction, including encryption and access controls.</p>

          <h3>6. Your Rights</h3>
          <p>Under the GDPR, you have the right to access, correct, delete, or restrict the processing of your data. To exercise these rights, contact us via the "Send Feedback" button in Settings.</p>

          <h3>7. Data Retention</h3>
          <p>Data is retained while your account is active or for as long as necessary to fulfil legal obligations. After a deletion request, data is removed within a maximum of 30 days.</p>

          <h3>8. Cookies</h3>
          <p>We use only technically essential cookies required for the platform to function (authentication session). We do not use tracking or advertising cookies.</p>

          <p><em>Last updated: 25/05/2026</em></p>
        `
    },
    terms: {
        title: 'Terms & Conditions',
        content: `
          <h3>1. Acceptance of Terms</h3>
          <p>By registering and using the Digital Library platform of Agrupamento de Escolas Tomás Cabreira, you confirm that you have read, understood, and accepted these Terms and Conditions.</p>

          <h3>2. Eligibility</h3>
          <p>This service is exclusively for students, teachers, and staff of Agrupamento de Escolas Tomás Cabreira. Registration with false information or by unauthorised users will be immediately cancelled.</p>

          <h3>3. Borrowing Books</h3>
          <ul>
            <li>Each user may have up to one (1) active loan at a time;</li>
            <li>After approval, the user has <strong>12 hours</strong> to pick up the book at the physical library;</li>
            <li>The maximum loan period is <strong>14 calendar days</strong> from the pickup date;</li>
            <li>The 4-digit PIN assigned is personal and non-transferable, and is required to complete the return.</li>
          </ul>

          <h3>4. Returns and Fines</h3>
          <p>Returning a book after the established deadline incurs a single fine of <strong>€5.00</strong>. Payment must be made in person at the library. While unpaid fines exist, the user may not make new loan requests.</p>

          <h3>5. User Responsibility</h3>
          <p>The user is responsible for the proper care of the book during the loan period. Damage, loss, or deterioration of the book may result in payment of the book's replacement value.</p>

          <h3>6. Intellectual Property</h3>
          <p>All content available on the platform, including texts, images, and metadata, is protected by copyright. Reproduction, distribution, or commercial use without express authorisation is strictly prohibited.</p>

          <h3>7. Account Suspension</h3>
          <p>The administration reserves the right to suspend or delete accounts in cases of misuse of the platform, breach of these terms, or behaviour harmful to the school community.</p>

          <h3>8. Limitation of Liability</h3>
          <p>The School Group is not responsible for temporary service interruptions, data loss due to technical failure, or indirect damages arising from the use of the platform.</p>

          <h3>9. Changes to Terms</h3>
          <p>We reserve the right to update these terms at any time. Users will be notified of significant changes. Continued use of the platform after notification constitutes acceptance of the new terms.</p>

          <p><em>Last updated: 25/05/2026</em></p>
        `
    },
  },
  home: {
    recommended: 'Recommended',
    catalog: 'Catalog',
    catalogSub: 'Explore all books available in our library',
    errorLoad: 'Could not load books.',
    errorCheckNet: 'Please check your internet connection.',
    retryBtn: 'Try Again',
    noBooksFound: 'No books matched your search.',
    searchNoResults: 'Try using different keywords or clearing your filters.',
    paginationLabel: 'Catalog pagination',
    page: 'Page {page}',
    prevPage: 'Previous page',
    nextPage: 'Next page',
  },
  myLoans: {
  title: 'My Library',
  subtitle: 'Loans and wishlist',
  tabs: {
    loans: 'Loans',
    wishlist: 'Wishlist'
  },
  emptyTitle: 'No loans',
  emptyDesc: 'You have not requested any books from our catalog yet.',
  exploreCatalog: 'Explore Catalog',
  status: {
    active: 'Active',
    pending: 'Pending',
    rejected: 'Rejected',
    returned: 'Returned'
  },
  requestLabel: 'Request'
},
auth: {
    loginTitle: 'Welcome back',
    loginSubtitle: 'Log in to access the library',
    emailLabel: 'Email',
    emailPlaceholder: 'your@email.com',
    passwordLabel: 'Password',
    passwordPlaceholder: '••••••••',
    signInBtn: 'Sign In',
    or: 'or',
    googleBtn: 'Continue with Google',
    noAccount: 'No account?',
    registerLink: 'Sign Up',
    signupTitle: 'Create Account',
    signupSubtitle: 'Join our library',
    nameLabel: 'Full name',
    namePlaceholder: 'John Doe',
    signUpBtn: 'Create account',
    hasAccount: 'Already have an account?',
    loginLink: 'Sign In',
    emailRateLimit:
      'Authentication email rate limit reached. Wait about an hour before trying again, or ask an admin to raise the limit in Supabase (Authentication → Rate Limits).',
    hookError:
      'Authentication email failed (hook). An admin must check the Send Email Hook in Supabase: authorization token (service_role), SEND_EMAIL_HOOK_SECRET, and auth-send-email deployed with --no-verify-jwt. See docs/AUTH_HOOK_TROUBLESHOOTING.md.'
  },
  notifications: {
    title: 'Notifications',
    subtitle: 'Stay up to date with your library',
    emptyTitle: 'All caught up!',
    emptyDesc: 'You have no notifications yet. Any updates about loans or new books will appear here.',
    exploreCatalog: 'Explore Catalog',
    markAllAsRead: 'Mark all as read',
    templates: {
      approvedTitle: 'Loan Approved',
      approvedMsg: 'Your loan request for the book "{book}" has been approved. The book is now available for pickup.',
      rejectedTitle: 'Loan Rejected',
      rejectedMsg: 'Your loan request for the book "{book}" could not be approved at this time.',
      returnedTitle: 'Book Returned',
      returnedMsg: 'We confirm the return of the book "{book}". Thank you for reading!',
      warningTitle: 'Return Notice',
      warningMsg: 'We remind you that the book "{book}" must be returned tomorrow. Please deliver it to the library.',
      registeredTitle: 'Reservation Registered',
      registeredMsg: 'Your reservation request for the book "{book}" has been received and is awaiting approval. You will have 12 hours to pick up the book at the library before the reservation automatically expires.'
    }
  },
  footer: {
    groupName: 'School Group',
    contacts: 'Contacts',
    usefulLinks: 'Useful Links',
    platform: 'Sdurão Platform',
    moodle: 'Group Moodle',
    website: 'Official Website',
    docs: 'Documentation',
    rights: '© {year} Agrupamento de Escolas Tomás Cabreira, in Faro. All rights reserved.'
  }
}
