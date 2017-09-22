package api

import (
	"reflect"
	"testing"
)

func TestParsePathParams(t *testing.T) {
	// arrange
	for _, tc := range []struct {
		name     string
		path     string
		pattern  string
		expected map[string]string
	}{
		{
			name:    "one param",
			path:    "/1/2/foo",
			pattern: "/some/path/:id",
			expected: map[string]string{
				"id": "foo",
			},
		},
		{
			name:    "two params",
			path:    "/1/2/foo/bar",
			pattern: "/some/path/:one/:two",
			expected: map[string]string{
				"one": "foo",
				"two": "bar",
			},
		},
		{
			name:    "param in the middle",
			path:    "foo/123/bar",
			pattern: "/some/:id/path",
			expected: map[string]string{
				"id": "123",
			},
		},
		{
			name:    "missing param",
			path:    "/1/2",
			pattern: "/some/path/:id",
			expected: map[string]string{
				"id": "",
			},
		},
		{
			name:    "more patterns than params",
			path:    "/1/2/foo",
			pattern: "/some/path/:one/:two",
			expected: map[string]string{
				"one": "foo",
				"two": "",
			},
		},
		{
			name:    "more params than patterns",
			path:    "/1/2/foo/bar",
			pattern: "/some/path/:one",
			expected: map[string]string{
				"one": "foo",
			},
		},
	} {
		// act
		actual := parsePathParams(tc.path, tc.pattern)
		// assert
		if !reflect.DeepEqual(actual, tc.expected) {
			t.Errorf("\n%s\ngot:  %v\nwant: %v", tc.name, actual, tc.expected)
		}
	}
}

func BenchmarkParsePathParams(b *testing.B) {
	for i := 0; i < b.N; i++ {
		parsePathParams("1/2/foo", "some/path/:id")
	}
}
