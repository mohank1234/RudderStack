"""
Module: palindrome.py
Description: Contains a function to check if a string is a palindrome.
"""

def is_palindrome(s: str) -> bool:
    """Check if the given string is a palindrome."""
    s = ''.join(c.lower() for c in s if c.isalnum())
    return s == s[::-1]
