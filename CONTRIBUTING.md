# Contributing to Misty Volume Bot

Thank you for your interest in contributing to Misty Volume Bot! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Screenshots if applicable

### Suggesting Features

Feature suggestions are welcome! Please:
- Check if the feature already exists or is planned
- Provide a clear use case
- Explain how it benefits users
- Consider implementation complexity

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/misty-volume-bot.git
   cd misty-volume-bot
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   - Test on devnet first
   - Verify dashboard still works
   - Check for console errors

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

   Use conventional commit messages:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation only
   - `style:` - Code style changes
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

6. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   
   Then create a Pull Request on GitHub with:
   - Clear title and description
   - Reference any related issues
   - Screenshots/videos if UI changes

## 📝 Code Style

- Use TypeScript for all source code
- Follow existing indentation (2 spaces)
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions focused and small

Example:
```typescript
/**
 * Execute a buy trade for the specified token
 * @param amount - Amount in SOL to trade
 * @param wallet - Wallet keypair for transaction
 * @returns Transaction signature
 */
async function executeBuyTrade(amount: number, wallet: Keypair): Promise<string> {
  // Implementation
}
```

## 🧪 Testing

Before submitting:
- Test on Solana devnet
- Verify all API endpoints work
- Check dashboard loads correctly
- Test emergency stop functionality
- Monitor for memory leaks

## 📚 Documentation

When adding features:
- Update README.md if needed
- Add JSDoc comments
- Update .env.example if new variables
- Create examples for complex features

## 🔒 Security

- Never commit private keys or sensitive data
- Use environment variables for secrets
- Report security issues privately
- Follow secure coding practices

## 🎯 Priority Areas

We're especially interested in:
- Performance optimizations
- Additional trading strategies
- Enhanced monitoring features
- Better error handling
- UI/UX improvements
- Test coverage

## ❓ Questions

If you have questions:
- Check existing issues and discussions
- Ask in GitHub Discussions
- Join our community (if applicable)

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🚀
