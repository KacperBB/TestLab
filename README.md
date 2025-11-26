# TestLab - Test Case Management System

A modern, responsive test case management application built with React. Features a beautiful dark/light theme, comprehensive dashboard, and powerful test case management capabilities.

![TestLab](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.4-purple)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎨 Modern UI/UX
- **Dark & Light Mode** - Seamless theme switching with smooth transitions
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Animated Components** - Beautiful animations and transitions throughout
- **Minimalist Design** - Clean and intuitive interface

### 📊 Dashboard
- **Visual Statistics** - Interactive pie and bar charts using Recharts
- **Success Rate Tracking** - Real-time pass rate calculation with progress bar
- **Recent Activity** - Quick access to recently run tests
- **Test Type Distribution** - Visual breakdown by test categories

### 🧪 Test Case Management
- **CRUD Operations** - Create, read, update, and delete test cases
- **Advanced Filtering** - Filter by status, type, and search by name
- **Sorting Options** - Sort by name or last run date
- **Pagination** - Configurable page sizes (5, 10, 25 items)
- **Detailed View** - Comprehensive test case information page

### 💾 Data Management
- **CSV Import/Export** - Import and export test cases in CSV format
- **Local Storage** - Automatic data persistence
- **Reset Functionality** - Restore default test data

### 🏷️ Test Categories
- Identification
- WLAN
- DTC (Diagnostic Trouble Codes)
- Session Control
- Security Access
- Write Operations
- Routine Control
- Sensor Readings
- Reset Operations
- Communication Control
- I/O Control

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/testlab.git
cd testlab
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🛠️ Tech Stack

- **React 19.2.0** - UI library
- **React Router DOM 7.9.6** - Routing
- **Recharts** - Data visualization
- **Vite 7.2.4** - Build tool
- **ESLint** - Code linting
- **CSS3** - Styling with CSS variables

## 📁 Project Structure

```
testlab/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Modal.jsx
│   │   │   └── Navigation.jsx
│   │   └── testCases/
│   │       ├── AddTestCaseForm.jsx
│   │       └── EditTestCaseForm.jsx
│   ├── context/
│   │   ├── TestCasesContext.jsx
│   │   ├── TestCasesReducer.js
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   └── testCases.js
│   ├── hooks/
│   │   ├── useDebouncedValue.js
│   │   ├── useFilteredTests.js
│   │   ├── usePagination.js
│   │   └── useTestStats.js
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── TestCaseDetailPage.jsx
│   │   └── TestCasesPage.jsx
│   ├── router/
│   │   └── AppRouter.jsx
│   ├── utils/
│   │   ├── csvExport.js
│   │   └── csvImport.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## 🎯 Usage

### Creating a Test Case
1. Navigate to the Test Cases page
2. Click "Dodaj nowy test case" button
3. Fill in the form with test details
4. Click "Dodaj test" to save

### Running Tests
1. Open any test case detail page
2. Click "Uruchom (PASS)" or "Uruchom (FAIL)"
3. The status and last run timestamp will be updated

### Filtering and Searching
- Use the search bar to find tests by name
- Filter by status: All, Passed, Failed, Not run
- Filter by type: All types or specific categories
- Sort by name or last run date

### Exporting Data
- Export all tests: Click "Eksport CSV" on Test Cases page
- Export single test: Click "Eksportuj CSV" on detail page

### Importing Data
- Click "Import CSV" button
- Select a CSV file with the correct format
- Data will be imported and merged with existing tests

## 🎨 Theme Customization

The app uses CSS variables for easy theme customization. Both dark and light themes are defined in `src/index.css`:

```css
:root[data-theme="dark"] {
  --bg-primary: #0a0e1a;
  --accent-primary: #6366f1;
  /* ... */
}

:root[data-theme="light"] {
  --bg-primary: #f8fafc;
  --accent-primary: #6366f1;
  /* ... */
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for the amazing library
- Recharts for beautiful charts
- Vite for the blazing fast build tool

---

Made with ❤️ using React and Vite
