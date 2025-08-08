import pytest
from src.palindrome import is_palindrome

def test_palindrome_true():
    assert is_palindrome('A man a plan a canal Panama')

def test_palindrome_false():
    assert not is_palindrome('RudderStack')

def test_palindrome_empty():
    assert is_palindrome('')

def test_palindrome_single_char():
    assert is_palindrome('x')
