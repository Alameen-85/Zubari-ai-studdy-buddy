# 🧠 Zubari AI Studdy Buddy - Flask Web Application

🚀 **Zubari AI Studdy Buddy** is a comprehensive Flask-based web application that leverages artificial intelligence to enhance the learning experience. The platform offers multiple AI-powered tools including question generation, text summarization, question answering, and personalized study plan creation.

---

## 🌟 Key Features

- 🔹 **Question Generator** - Generate relevant practice questions from any paragraph or text
- 🔹 **Text Summarization** - Convert long texts into concise, digestible summaries
- 🔹 **Question Answering** - Get precise answers based on provided context
- 🔹 **Study Plan Generator** - Create structured, personalized study schedules
- 🔹 **Premium Subscription** - Unlimited AI requests with Paystack payment integration
- 🔹 **User Authentication** - Secure login and registration system
- 🔹 **Usage Tracking** - Monitor AI request usage for free tier users

---

## 🛠️ Technology Stack

| **Component** | **Technology** |
|---------------|----------------|
| **Backend** | Flask (Python) |
| **Database** | MySQL |
| **Frontend** | Vanilla HTML, CSS, JavaScript |
| **Authentication** | bcrypt password hashing |
| **Payments** | Paystack integration |
| **Styling** | Pure CSS with modern design |

---

## 📂 Project Structure

```
📦 Zubari-AI-Studdy-Buddy/
├── 📁 public/              # Static frontend files
│   ├── 📄 index.html       # Homepage
│   ├── 📄 login.html       # Login page
│   ├── 📄 signup.html      # Registration page
│   ├── 📄 premium.html     # Premium plans page
│   ├── 📄 tools.html       # AI tools interface
│   ├── 📄 style.css        # Main stylesheet
│   └── 📄 script.js        # Frontend JavaScript
├── 📁 images/              # Application screenshots
├── 📄 app.py               # Main Flask application
├── 📄 requirements.txt     # Python dependencies
├── 📄 README.md            # Project documentation
└── 📄 LICENSE              # MIT License
```

---

## 🔧 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- MySQL Server 8.0 or higher
- pip (Python package installer)

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/zubari-ai-studdy-buddy.git
cd zubari-ai-studdy-buddy
```

### Step 2: Create Virtual Environment
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: MySQL Database Setup
1. **Install MySQL Server** if not already installed
2. **Create Database User** (optional but recommended):
```sql
CREATE USER 'zubari_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON zubari_ai.* TO 'zubari_user'@'localhost';
FLUSH PRIVILEGES;
```

3. **Update Database Configuration** in `app.py`:
```python
DB_CONFIG = {
    'host': 'localhost',
    'database': 'zubari_ai',
    'user': 'your_mysql_username',
    'password': 'your_mysql_password',
    'charset': 'utf8mb4',
    'collation': 'utf8mb4_unicode_ci'
}
```

### Step 5: Configure Paystack Integration
1. **Create Paystack Account** at [paystack.com](https://paystack.com)
2. **Get API Keys** from your Paystack dashboard
3. **Update Payment Configuration** in `app.py`:
```python
# Replace with your actual Paystack public key
'publicKey': 'pk_test_your_actual_paystack_public_key'
```

### Step 6: Run the Application
```bash
python app.py
```

The application will be available at: **http://localhost:3000**

---

## 📱 Complete Step-by-Step User Guide

### 🚀 Getting Started

#### Step 1: Create Your Account
1. **Open your web browser** and navigate to `http://localhost:3000`
2. **Click "Sign Up"** in the top-right corner of the navigation bar
3. **Fill in the registration form**:
   - Enter a valid email address
   - Create a strong password (minimum 8 characters recommended)
   - Confirm your password by typing it again
4. **Click "Create Account"** to complete registration
5. **Automatic Login**: You'll be automatically logged in and redirected to the homepage

#### Step 2: Explore the Homepage
After successful registration, you'll see:
- **Welcome message** with your personalized greeting
- **Four AI tool cards** showcasing available features
- **Premium banner** highlighting upgrade options
- **Navigation bar** showing your email and logout option

---

### 🛠️ Using the AI Tools

#### 🔍 Tool 1: Question Generator

**Purpose**: Generate practice questions from any text to test your understanding

**Step-by-Step Process**:
1. **Access the Tool**:
   - From the homepage, click on the **"Question Generator"** card (❓ icon)
   - You'll be redirected to the tools page with the Question Generator active

2. **Input Your Content**:
   - In the large text area, paste or type a paragraph of text
   - This could be from textbooks, articles, lecture notes, or any educational content
   - **Example**: "Photosynthesis is the process by which plants convert sunlight into energy..."

3. **Generate Questions**:
   - Click the **"Generate Questions"** button
   - Wait for the AI to process your text (usually 2-3 seconds)

4. **Review Results**:
   - Generated questions will appear below the form
   - Each question is designed to test different aspects of comprehension
   - Use these questions for self-assessment or study group discussions

**Best Practices**:
- Use paragraphs of 50-300 words for optimal results
- Include key concepts and important details in your input text
- Save generated questions for later review

---

#### 📝 Tool 2: Text Summarizer

**Purpose**: Convert long texts into concise, easy-to-understand summaries

**Step-by-Step Process**:
1. **Access the Tool**:
   - Click on the **"Text Summarizer"** card (📝 icon) from the homepage
   - The summarizer interface will load

2. **Input Your Text**:
   - Paste long articles, research papers, or extensive notes
   - The tool works best with texts of 200+ words
   - **Example**: Copy an entire Wikipedia article or research paper

3. **Generate Summary**:
   - Click the **"Summarize"** button
   - The AI will process and condense your text

4. **Use Your Summary**:
   - Review the concise summary highlighting key points
   - Use for quick revision before exams
   - Create study notes from lengthy materials

**Best Practices**:
- Use for academic papers, long articles, or textbook chapters
- Review the summary alongside the original text initially
- Save summaries for quick reference during exam preparation

---

#### 🤖 Tool 3: Question Answering

**Purpose**: Get specific answers to your questions based on provided context

**Step-by-Step Process**:
1. **Access the Tool**:
   - Click on the **"Question Answering"** card (🤖 icon)
   - The Q&A interface will open

2. **Provide Context**:
   - In the **"Context"** field, paste relevant background information
   - This could be a paragraph from your textbook, lecture notes, or study materials
   - **Example**: "The water cycle involves evaporation, condensation, and precipitation..."

3. **Ask Your Question**:
   - In the **"Question"** field, type your specific question
   - Be clear and specific for better answers
   - **Example**: "What role does temperature play in evaporation?"

4. **Get Your Answer**:
   - Click **"Get Answer"**
   - The AI will analyze the context and provide a relevant answer
   - The answer will be based specifically on the context you provided

**Best Practices**:
- Provide comprehensive context for better answers
- Ask specific, focused questions
- Use this tool when you need clarification on specific concepts

---

#### 📅 Tool 4: Study Plan Generator

**Purpose**: Create personalized, time-based study schedules

**Step-by-Step Process**:
1. **Access the Tool**:
   - Click on the **"Study Plan Generator"** card (📅 icon)
   - The study plan form will appear

2. **Fill in Required Information**:
   - **Syllabus**: Enter your course or subject name
     - *Example*: "Introduction to Biology", "Advanced Mathematics", "World History"
   
   - **Topics**: List the specific topics you need to cover
     - *Example*: "Cell structure, Photosynthesis, Genetics, Evolution"
   
   - **Start Date**: Select when you want to begin studying
     - Use the date picker to choose your preferred start date
   
   - **Deadline**: Set your target completion date
     - This could be an exam date or personal goal

3. **Generate Your Plan**:
   - Click **"Generate Plan"** after filling all fields
   - The AI will create a structured study schedule

4. **Follow Your Plan**:
   - Review the generated timeline and daily tasks
   - Adjust your schedule based on the recommendations
   - Use the plan as a roadmap for your studies

**Best Practices**:
- Be realistic with your timeline
- Include buffer time for review and practice
- Break down complex topics into smaller, manageable sections

---

### 💎 Premium Subscription Guide

#### Understanding Usage Limits
- **Free Tier**: 5 AI requests per month across all tools
- **Premium**: Unlimited AI requests with no restrictions
- **Usage Tracking**: Your remaining requests are displayed at the top of the tools page

#### Upgrading to Premium

**Step 1: Access Premium Plans**
- Click **"View Plans"** from the homepage banner, or
- When you reach your free tier limit, click **"View Premium Plans"** in the upgrade modal

**Step 2: Choose Your Plan**
- **Monthly Plan**: KES 1,000/month - Perfect for short-term intensive study periods
- **Yearly Plan**: KES 10,000/year - **Save KES 2,000!** - Best value for ongoing learning

**Step 3: Complete Payment**
1. Click **"Choose Monthly"** or **"Choose Yearly"**
2. **Paystack Checkout** will open automatically
3. **Enter Payment Details**:
   - Card number, expiry date, and CVV
   - Or choose Mobile Money (M-Pesa, Airtel Money)
   - Or select Bank Transfer option
4. **Confirm Payment** by clicking "Pay Now"
5. **Instant Activation**: Premium features activate immediately after successful payment

**Step 4: Enjoy Premium Benefits**
- Unlimited AI requests across all tools
- Priority processing for faster responses
- Access to advanced features as they're released

---

### 👤 Account Management

#### Checking Your Status
- **Usage Information**: Displayed at the top of the tools page
- **Subscription Status**: Visible in your user menu
- **Request Counter**: Shows remaining free requests or "Unlimited" for premium users

#### Managing Your Account
1. **View Account Info**: Click on your email in the navigation bar
2. **Logout**: Click "Logout" to securely end your session
3. **Subscription Management**: Premium status and expiry dates are automatically tracked

---

### 🔧 Troubleshooting Common Issues

#### Login Problems
- **Forgot Password**: Currently handled manually - contact support
- **Account Not Found**: Ensure you're using the correct email address
- **Login Fails**: Check your internet connection and try again

#### Tool Usage Issues
- **No Response**: Check your internet connection
- **Error Messages**: Read the specific error and follow the suggested action
- **Slow Performance**: Large texts may take longer to process

#### Payment Issues
- **Payment Fails**: Try a different payment method or contact your bank
- **Premium Not Activated**: Refresh the page and check your subscription status
- **Refund Requests**: Contact support with your payment reference

---

### 📊 Usage Tips for Maximum Benefit

#### For Students
- **Daily Practice**: Use the Question Generator daily with your reading materials
- **Exam Preparation**: Summarize lengthy chapters before exams
- **Homework Help**: Use Q&A for clarification on difficult concepts
- **Time Management**: Create study plans for each subject

#### For Educators
- **Content Creation**: Generate questions for quizzes and tests
- **Lesson Planning**: Summarize research materials for lesson preparation
- **Student Support**: Help students create effective study schedules

#### For Professionals
- **Skill Development**: Create learning plans for new skills
- **Research**: Summarize industry reports and papers
- **Knowledge Testing**: Generate questions to assess understanding

---

## 🔒 Security & Privacy

- **Password Security**: All passwords are encrypted using bcrypt hashing
- **Session Management**: Secure user sessions with automatic timeout
- **Data Protection**: User data is stored securely in MySQL database
- **Payment Security**: All payments processed through Paystack's secure, PCI-compliant system

---

## 🚀 Deployment

### Local Development
```bash
python app.py
```

### Production Deployment
1. **Set up MySQL** on your production server
2. **Configure environment variables** for database credentials
3. **Update Paystack keys** with production keys
4. **Deploy using** your preferred hosting service (Heroku, DigitalOcean, AWS, etc.)

---

## 🔮 Future Enhancements

- 🤖 **Real AI Integration**: Replace mock responses with actual AI models (OpenAI, Anthropic)
- 📊 **Analytics Dashboard**: Track learning progress and statistics
- 🎯 **Personalized Recommendations**: AI-driven study suggestions
- 📱 **Mobile App**: Native iOS and Android applications
- 🌍 **Multi-language Support**: Support for multiple languages
- 🔗 **API Access**: RESTful API for third-party integrations
- 📚 **Study Groups**: Collaborative learning features
- 🏆 **Gamification**: Points, badges, and leaderboards

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature-name`
3. **Commit** your changes: `git commit -m "Add feature"`
4. **Push** to the branch: `git push origin feature-name`
5. **Submit** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support & Contact

For questions, support, or collaboration opportunities:

- 📧 **Email**: philipbarongo30@gmail.com
- 🔗 **LinkedIn**: [Philip Barongo](https://www.linkedin.com/in/philip-barongo-8b215028a/)
- 🌐 **GitHub**: [PhilipOndieki](https://github.com/PhilipOndieki)
- 📱 **Phone**: +254703141296

---

## 🙏 Acknowledgments

- **Flask Community** for the excellent web framework
- **MySQL** for reliable database management
- **Paystack** for seamless payment processing in Kenya
- **Open Source Community** for inspiration and resources

---

## 📋 System Requirements

### Minimum Requirements
- **Python**: 3.8+
- **MySQL**: 8.0+
- **RAM**: 512MB
- **Storage**: 100MB free space
- **Internet**: Stable connection for AI features

### Recommended Requirements
- **Python**: 3.10+
- **MySQL**: 8.0+ with InnoDB engine
- **RAM**: 1GB+
- **Storage**: 500MB free space
- **Internet**: Broadband connection for optimal performance

---

## 🔍 API Endpoints Reference

### Authentication
- `POST /api/signup` - Create new user account
- `POST /api/login` - User authentication
- `POST /api/logout` - End user session
- `GET /api/user-status` - Get current user information

### AI Tools
- `POST /api/generate-questions` - Generate questions from text
- `POST /api/summarize` - Summarize long text
- `POST /api/answer-question` - Answer questions with context
- `POST /api/generate-study-plan` - Create personalized study plans

### Payments
- `POST /api/initiate-payment` - Start premium subscription payment
- `POST /api/verify-payment` - Verify and activate premium subscription

---

🌟 **If you find this project helpful, please give it a star!** ⭐

---

*Built with ❤️ by Philip Ondieki*