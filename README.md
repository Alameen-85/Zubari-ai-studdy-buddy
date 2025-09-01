# 🧠 Zubari AI Studdy Buddy – Flashcard Generator

An AI-powered web application that transforms study notes into interactive flashcards and quizzes. Built for students, by students.

---

## 🚀 Features

• **Paste study notes** → get flashcards instantly
• **Interactive flashcards** (click to reveal answers)
• **Quiz generation** using Cohere API
• **Flashcards stored** in MySQL database
• **Premium subscription** via Paystack integration

---

## 🛠️ Tech Stack

| **Layer** | **Technology** |
|-----------|----------------|
| **Frontend** | HTML, CSS, JavaScript |
| **Backend** | Flask (Python) |
| **Database** | MySQL |
| **AI APIs** | OpenAI (Flashcards), Cohere (Quizzes) |
| **Payments** | Paystack |

---

## 📂 Project Structure

```
zubari-ai-studdy-buddy/
│
├── public/                 # Static frontend files
│   ├── index.html         # Homepage
│   ├── login.html         # Login page
│   ├── signup.html        # Registration page
│   ├── premium.html       # Premium plans page
│   ├── flashcards.html    # Flashcard tools interface
│   ├── style.css          # Main stylesheet
│   └── script.js          # Frontend JavaScript
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
└── LICENSE               # MIT License
```

---

## 🧪 Setup Instructions

### Prerequisites
- Python 3.8 or higher
- MySQL Server 8.0 or higher
- OpenAI API key
- Cohere API key
- Paystack account (for payments)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/zubari-ai-studdy-buddy.git
cd zubari-ai-studdy-buddy
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure MySQL Database
Create a database named `zubari_flashcards`:

```sql
CREATE DATABASE zubari_flashcards;
```

Update your MySQL credentials in `app.py`:
```python
DB_CONFIG = {
    'host': 'localhost',
    'database': 'zubari_flashcards',
    'user': 'your_mysql_username',
    'password': 'your_mysql_password',
    'charset': 'utf8mb4',
    'collation': 'utf8mb4_unicode_ci'
}
```

### 4. Configure API Keys
Update the API keys in `app.py`:

```python
# OpenAI Configuration
openai.api_key = 'your-openai-api-key'

# Cohere Configuration
cohere_client = cohere.Client('your-cohere-api-key')

# Paystack Configuration (in the payment route)
'publicKey': 'pk_test_your_paystack_public_key'
```

### 5. Run the Flask Application
```bash
python app.py
```

Visit **http://localhost:5000** to access the application.

---

## 📖 Complete User Guide

### 🚀 Getting Started

#### Step 1: Create Your Account
1. **Navigate** to `http://localhost:5000`
2. **Click "Sign Up"** in the navigation bar
3. **Enter your details**:
   - Valid email address
   - Strong password (8+ characters)
   - Confirm password
4. **Click "Create Account"**
5. **Automatic login** and redirect to homepage

#### Step 2: Explore the Dashboard
After login, you'll see four main tools:
- **🃏 Flashcard Generator** - Convert notes to flashcards
- **📝 Quiz Generator** - Create multiple-choice quizzes
- **📚 My Flashcards** - View saved flashcards
- **🎯 Study Session** - Interactive study mode

---

### 🃏 Using the Flashcard Generator

#### Step 1: Access the Tool
- Click on **"Flashcard Generator"** from the homepage
- You'll be redirected to the flashcard tools page

#### Step 2: Input Your Study Material
1. **Deck Name**: Enter a name for your flashcard set
   - Example: "Biology Chapter 5", "Math Formulas", "History Dates"
2. **Study Notes**: Paste your study material
   - Can be from textbooks, lecture notes, or any educational content
   - Works best with 200-1000 words

#### Step 3: Generate Flashcards
1. **Click "Generate Flashcards"**
2. **Wait for AI processing** (2-5 seconds)
3. **Review generated flashcards**:
   - Each card shows a question on the front
   - Click any card to flip and see the answer
   - Cards are automatically saved to your account

#### Step 4: Study with Your Flashcards
- **Click cards** to flip between question and answer
- **Use "Start Study Session"** for guided practice
- **Delete unwanted cards** using the × button

---

### 📝 Using the Quiz Generator

#### Step 1: Access Quiz Generator
- Click **"Quiz Generator"** from the tools menu
- The quiz interface will load

#### Step 2: Input Study Material
- **Paste your study content** in the text area
- Include key concepts, definitions, and important facts
- The AI works best with comprehensive material

#### Step 3: Take Your Quiz
1. **Click "Generate Quiz"**
2. **Answer multiple-choice questions**:
   - Read each question carefully
   - Click your chosen answer (A, B, C, or D)
   - Immediate feedback shows correct/incorrect
3. **View your final score** and performance summary

#### Step 4: Review and Improve
- **Retake quizzes** to improve your score
- **Generate new quizzes** from different study materials
- **Use results** to identify areas needing more study

---

### 📚 Managing Your Flashcards

#### Viewing Saved Flashcards
1. **Click "My Flashcards"** from the tools menu
2. **Click "Load My Flashcards"** to see all saved cards
3. **Browse by deck** or view all cards together

#### Organizing Your Collection
- **Deck Names**: Use descriptive names for easy organization
- **Delete Cards**: Remove cards that are no longer needed
- **Study Sessions**: Practice with specific decks or all cards

#### Interactive Features
- **Click to flip**: Tap any flashcard to see the answer
- **Hover effects**: Visual feedback for better interaction
- **Responsive design**: Works on desktop, tablet, and mobile

---

### 🎯 Study Sessions

#### Starting a Session
1. **Generate or load flashcards** first
2. **Click "Start Study Session"**
3. **Interactive study mode** begins

#### Session Features
- **Progress tracking**: See current card number and total
- **Score calculation**: Track your accuracy percentage
- **Self-assessment**: Mark answers as correct or incorrect
- **Automatic progression**: Move through cards systematically

#### Session Controls
- **Reveal Answer**: Show the answer when ready
- **Mark Correct/Incorrect**: Self-assess your knowledge
- **Next Card**: Progress through your deck
- **Final Score**: See overall performance at the end

---

### 💎 Premium Subscription

#### Understanding Limits
- **Free Tier**: 5 AI requests per month
- **Premium**: Unlimited flashcard and quiz generation
- **Usage Tracking**: Monitor remaining requests in the top bar

#### Subscription Plans
- **Monthly**: KES 1,000/month
- **Yearly**: KES 10,000/year (Save KES 2,000!)

#### Payment Process
1. **Click "View Plans"** from the premium banner
2. **Choose your plan** (Monthly or Yearly)
3. **Paystack checkout** opens automatically
4. **Complete payment** using:
   - Credit/Debit card
   - Mobile Money (M-Pesa, Airtel Money)
   - Bank transfer
5. **Instant activation** of premium features

---

## 🔧 Technical Configuration

### Database Schema
The application automatically creates these tables:

```sql
-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    subscription_type ENUM('free', 'premium') DEFAULT 'free',
    subscription_expires DATETIME NULL,
    ai_requests_used INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Flashcards table
CREATE TABLE flashcards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    deck_name VARCHAR(255) DEFAULT 'General',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Payments table
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'KES',
    subscription_type ENUM('monthly', 'yearly') NOT NULL,
    payment_reference VARCHAR(255) UNIQUE,
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- AI requests log
CREATE TABLE ai_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    request_type ENUM('flashcard_generation', 'quiz_generation') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### API Endpoints

#### Authentication
- `POST /api/signup` - Create new user account
- `POST /api/login` - User authentication
- `POST /api/logout` - End user session
- `GET /api/user-status` - Get current user information

#### Flashcard Management
- `POST /api/generate-flashcards` - Generate flashcards from notes
- `POST /api/generate-quiz` - Create quiz from study material
- `GET /api/get-flashcards` - Retrieve user's saved flashcards
- `DELETE /api/delete-flashcard` - Remove specific flashcard

#### Payments
- `POST /api/initiate-payment` - Start premium subscription payment
- `POST /api/verify-payment` - Verify and activate premium subscription

---

## 🎓 Best Practices for Effective Learning

### Creating Quality Flashcards
- **Use clear, concise questions** that test specific concepts
- **Include context** in your study notes for better AI generation
- **Review and edit** generated flashcards for accuracy
- **Organize by topic** using descriptive deck names

### Effective Study Sessions
- **Regular practice**: Use flashcards daily for best retention
- **Spaced repetition**: Review cards at increasing intervals
- **Self-assessment**: Be honest when marking correct/incorrect
- **Focus on weak areas**: Spend more time on difficult concepts

### Maximizing Quiz Benefits
- **Take quizzes multiple times** to reinforce learning
- **Analyze wrong answers** to identify knowledge gaps
- **Use varied study materials** for comprehensive coverage
- **Track improvement** over time with repeated quizzes

---

## 🔒 Security & Privacy

- **Password Security**: bcrypt encryption for all user passwords
- **Session Management**: Secure user sessions with automatic timeout
- **Data Protection**: User flashcards stored securely in MySQL
- **Payment Security**: All transactions processed through Paystack's secure system
- **API Security**: Rate limiting and authentication for all AI requests

---

## 🚀 Deployment

### Local Development
```bash
python app.py
```
Application runs on `http://localhost:5000`

### Production Deployment
1. **Set up MySQL** on production server
2. **Configure environment variables** for API keys and database
3. **Update Paystack keys** with production credentials
4. **Deploy using** preferred hosting service (Heroku, DigitalOcean, AWS)

### Environment Variables (Production)
```bash
OPENAI_API_KEY=your_openai_key
COHERE_API_KEY=your_cohere_key
PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
MYSQL_HOST=your_mysql_host
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=zubari_flashcards
```

---

## 🔮 Future Enhancements

- 🤖 **Advanced AI Models**: Integration with GPT-4 and Claude
- 📊 **Learning Analytics**: Detailed progress tracking and insights
- 🎯 **Spaced Repetition**: Intelligent scheduling for optimal retention
- 📱 **Mobile App**: Native iOS and Android applications
- 🌍 **Multi-language**: Support for multiple languages
- 🔗 **Export Options**: PDF, Anki, and other format exports
- 👥 **Collaborative Decks**: Share flashcards with classmates
- 🏆 **Gamification**: Points, streaks, and achievement systems

---

## 🤝 Contributing

We welcome contributions! To get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature-name`
3. **Make** your changes with proper testing
4. **Commit** changes: `git commit -m "Add feature"`
5. **Push** to branch: `git push origin feature-name`
6. **Submit** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support & Contact

For questions, support, or collaboration:

- 📧 **Email**: philipbarongo30@gmail.com
- 🔗 **LinkedIn**: [Philip Barongo](https://www.linkedin.com/in/philip-barongo-8b215028a/)
- 🌐 **GitHub**: [PhilipOndieki](https://github.com/PhilipOndieki)
- 📱 **Phone**: +254703141296

---

## 🙏 Acknowledgments

- **OpenAI** for powerful language models
- **Cohere** for quiz generation capabilities
- **Paystack** for seamless payment processing in Kenya
- **Flask Community** for the excellent web framework
- **MySQL** for reliable database management

---

## 📋 System Requirements

### Minimum Requirements
- **Python**: 3.8+
- **MySQL**: 8.0+
- **RAM**: 1GB
- **Storage**: 200MB free space
- **Internet**: Stable connection for AI APIs

### Recommended Requirements
- **Python**: 3.10+
- **MySQL**: 8.0+ with InnoDB engine
- **RAM**: 2GB+
- **Storage**: 1GB free space
- **Internet**: Broadband connection for optimal AI performance

---

## 🔍 Troubleshooting

### Common Issues

#### Database Connection Problems
```bash
# Check MySQL service status
sudo systemctl status mysql

# Restart MySQL if needed
sudo systemctl restart mysql
```

#### API Key Issues
- Verify OpenAI API key has sufficient credits
- Ensure Cohere API key is active and valid
- Check API key permissions and rate limits

#### Payment Integration
- Confirm Paystack keys are correct (test vs production)
- Verify webhook URLs are properly configured
- Check payment reference generation

### Error Messages
- **"Module not found"**: Run `pip install -r requirements.txt`
- **"Database connection failed"**: Check MySQL credentials and service
- **"API request failed"**: Verify API keys and internet connection
- **"Payment failed"**: Check Paystack configuration and user payment method

---

## 💳 Premium Subscription Details

### Pricing
- **Monthly Plan**: KES 1,000/month
- **Yearly Plan**: KES 10,000/year (17% savings)

### Benefits
- **Unlimited AI requests** for flashcard generation
- **Unlimited quiz creation** with Cohere AI
- **Priority processing** for faster response times
- **Advanced features** as they become available
- **Email support** for technical assistance

### Payment Methods (via Paystack)
- **Credit/Debit Cards**: Visa, Mastercard, Verve
- **Mobile Money**: M-Pesa, Airtel Money
- **Bank Transfer**: Direct bank transfers
- **USSD**: Mobile banking via USSD codes

---

🌟 **If you find this project helpful, please give it a star!** ⭐

---

*Built with ❤️ by Philip Ondieki*