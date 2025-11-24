-- Create database
CREATE DATABASE IF NOT EXISTS encrypted_app;
USE encrypted_app;

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  category_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
  ('Development', 'Tasks related to development and coding'),
  ('Security', 'Tasks focused on security implementation'),
  ('Design', 'Tasks related to UI/UX design'),
  ('Testing', 'Tasks for testing and quality assurance');

-- Insert sample tasks with category references
INSERT INTO tasks (title, description, completed, category_id) VALUES
  ('Setup Development Environment', 'Install Node.js, MySQL, and configure project', TRUE, 1),
  ('Implement Encryption', 'Add AES-256-GCM encryption for secure communication', TRUE, 2),
  ('Build Frontend UI', 'Create React application with modern design', FALSE, 3),
  ('Test End-to-End Flow', 'Verify encrypted data transmission works correctly', FALSE, 4);
