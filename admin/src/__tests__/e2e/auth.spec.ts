import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should redirect to signin page when not authenticated', async ({ page }) => {
    // Try to access protected route
    await page.goto('/dashboard')
    
    // Should be redirected to signin page
    await expect(page).toHaveURL('/auth/signin')
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible()
  })

  test('should show validation errors for invalid credentials', async ({ page }) => {
    await page.goto('/auth/signin')
    
    // Try to submit empty form
    await page.getByRole('button', { name: 'Sign In' }).click()
    
    // Should show validation errors
    await expect(page.getByText('Email is required')).toBeVisible()
    await expect(page.getByText('Password is required')).toBeVisible()
  })

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/auth/signin')
    
    // Fill in invalid credentials
    await page.getByLabel('Email').fill('invalid@example.com')
    await page.getByLabel('Password').fill('wrongpassword')
    await page.getByRole('button', { name: 'Sign In' }).click()
    
    // Should show error message
    await expect(page.getByText('Invalid credentials')).toBeVisible()
  })

  test('should successfully authenticate with valid credentials', async ({ page }) => {
    await page.goto('/auth/signin')
    
    // Fill in valid credentials (you'll need to set up test data)
    await page.getByLabel('Email').fill('admin@example.com')
    await page.getByLabel('Password').fill('admin123')
    await page.getByRole('button', { name: 'Sign In' }).click()
    
    // Should be redirected to dashboard
    await expect(page).toHaveURL('/dashboard')
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  })
}) 