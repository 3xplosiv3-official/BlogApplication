"""
Schemas Base.

This module defines a base Pydantic model that can be used throughout
the application for standardizing the response format, especially for errors.
"""

from pydantic import BaseModel


class ErrorResponse(BaseModel):
    """
     A Pydantic model representing a standard error response.

     This model standardizes the error response format for the API.
     Whenever an error occurs, the API will return a response that
     matches this structure.

     Attributes:
         detail (str): A human-readable description of the error that occurred.
     """
    detail: str
